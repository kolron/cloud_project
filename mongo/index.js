const express = require("express");
const app = express();
var server = require("http").Server(app);
const redis = require("redis");
const redisClient = redis.createClient();
const sub = redis.createClient();
sub.subscribe("arrival");
sub.subscribe("shipped");
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://ron:ron@cluster0.x3cfx.mongodb.net/test?retryWrites=true&w=majority";



  sub.on("message", (channel, data) => {
  if (channel == "shipped") {
    redisClient.hgetall(data, (err, object) => {
      console.log(object)
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("connected to mongo!");
        var dbo = db.db("project");
        dbo.collection("packages").insertOne(object, (ers, res) => {
          if (err) throw err;
          console.log("inserted document");
          db.close();
        });
      });
      redisClient.hincrby(object.district, "TOTAL_PRICE", object.price, (err, reply) => {
        console.log(object.price)
        console.log(reply);
      });
      redisClient.hincrby(object.district, "TOTAL", 1, (err, reply) => {
        console.log(reply);
      });
      redisClient.incrby("TOTAL", 1, (err, reply) => {
        console.log(reply);
      });

      redisClient.hincrby(object.district, "ON_ROUTE", 1, (err, reply) => {
        console.log(reply);
      });

      redisClient.incrby("ON_ROUTE", 1, (err, reply) => {
        console.log(reply);
      });
});
  }
  })




sub.on("message", (channel, data) => {
  if (channel == "arrival") {
    redisClient.hgetall(data, (err, object) => {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("connected to mongo!");
        var dbo = db.db("project");
        var query = {serial_number: object.serial_number}
        var newval = {$set: {status : "arrived"}}
        dbo.collection("packages").updateOne(query, newval ,(ers, res) => {
          if (err) throw err;
          console.log("updated document");
          db.close();
        });
      });
      if (object == null ){
        console.log(data,object)
      }
      redisClient.hincrby(object.district, "ON_ROUTE", -1, (err, reply) => {
        console.log(reply);
      });
      redisClient.decrby("ON_ROUTE", 1, (err, reply) => {
        console.log(reply);
      });
      redisClient.hincrby(object.district, "ARRIVED", 1, (err, reply) => {
        console.log(reply);
      });
      redisClient.incrby("ARRIVED", 1, (err, reply) => {
        console.log(reply);
      });
      redisClient.del(data,(err,reply)=>{
        console.log(reply)})
    });
  }
});

redisClient.on("connect", (err, reply) => {
  console.log("connected to redis");
});

server.listen(6064, (err, reply) => console.log("listening on port 6064"));
