const express = require("express");
const app = express();
var server = require("http").Server(app);
var redis = require("redis");
var redisClient = redis.createClient();
const generator = require("./qrGenerator");
const functions = require("./functions")

function createRandomShipment(products) {
  var items = functions.generateItems(products);
  var price = functions.genereatePrice(items.items);
  var address = functions.generateAdress();
  var package = {
    serial_number: functions.generateSerial(),
    recv_name: functions.generateName(),
    size: items.size,
    shipping_date: functions.getFullDate(),
    price: price.price,
    tax_status: price.tax_status,
    address: address.address,
    district: address.district,
    status: "On Route",
    items: items.items
  };
  return package;
}

function SimShipment(products) {
  console.log("started simShipment");
  var package = createRandomShipment(products);
  const result = generator.generate(package, package.serial_number);
  console.log(package);
  //save package to redis
  redisClient.hmset(
    package.serial_number,
    "serial_number",
    package.serial_number,
    "reciever name",
    package.recv_name,
    "price",
    package.price,
    "size",
    package.size,
    "tax_status",
    package.tax_status,
    "address",
    package.address,
    "district",
    package.district,
    "status",
    package.status,
    "items",
    `${JSON.stringify(package.items)}`
  );
  redisClient.publish("shipped", package.serial_number.toString(), () => {
    console.log("publish");
  });
  console.log(JSON.stringify(package));
}



redisClient.on("connect", function () {
  console.log("Simulator connected to Redis");
});
server.listen(6062, function () {
  console.log("Simulator is running on port 6062");
});


function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = setInterval(function () {
    callback();
    if (++x === repetitions) {
      clearInterval(intervalID);
      return;
    }
  }, delay);
}

setIntervalX(
  function () {
    SimShipment();
  },
  1500,
  10
)
