
const express =require('express')
const router = express.Router();
const functions = require('../../shipping_sim/functions')
const redis = require('redis')
const {generate} = require('../../shipping_sim/qrGenerator')


function sendPackage(package){
  const result = generate(package,package.serial_number)
  const redisClient = redis.createClient();
  console.log(package)
  redisClient.hmset(
    package.serial_number,
    "serial_number",
    package.serial_number,

    "receiver name",
    package.recv_name,
    "items",
    `${JSON.stringify(package.items)}`,
    "size",
    package.size,
    "tax_status",
    package.tax_status,
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

}

router.get('/',(req,res)=>{
  res.render('pages/sendPackage')
})

router.get('/submitPackage', (req,res)=>{
  var items = functions.generateItems();
  var price = functions.genereatePrice(items.items);
  var package = {
    serial_number: functions.generateSerial(),
    recv_name:req.query.recv_name,
    
    size : items.size,
    shipping_date:functions.getFullDate(),
    price : price.price,
    tax_status : price.tax_status,
    district:req.query.shipping_area,
    status:"On Route",
    items: items.items
  }
  sendPackage(package)
  res.send("Sent Package:")
})

module.exports = router
