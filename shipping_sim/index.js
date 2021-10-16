const express = require('express')
const app = express()
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient()
var sub = redis.createClient()
var {v4:uuidv4} = require('uuid')
const generator = require("./qrGenerator");


 function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        
        return array;
    }
    
 var products = [{name: "earphones",price:10}, {name:'phone_case',price:2}, 
 {name: "pillow",price:20}, {name:"shoes",price :50},{name:"laptop",price:200},
 {name:"backpack",price:50}, {name: "type-C cable",price:3},{name:"mug",price:1},
 {name:"mouse",price :20},{name:"keyboard",price:20},{name:"batteries",price:1}];

    
 function generateItems(list) {
    if(!list){list = products} 
    let shuffled = shuffle(list)
    var selected = shuffled.slice(0,Math.floor(Math.random()*3+1))
    var size;
    switch(selected.length){
        case 1: 
        size = 'Small'
        break;
        case 2:
        size = 'Medium'
        break;
        case 3:
        size = 'Large'
        break;
    }
    return {items:selected, size:size}
 }


 function generateSerial() {
    var serial = uuidv4()
    return serial
 }


  function generateAdress() {
    const district = ['north','haifa','center','south']
    var shuffled = shuffle(district)
    console.log('shuffeled dist')
    var selected_dist = shuffled.slice(0,Math.floor(Math.random()+1))
    let cities;
    if(selected_dist == 'north'){
        cities = ['Nazareth','Acre','Naharia','Afula','Karmiel','Tiberias','Safed','Yokneam','Qiryat Shemona']
    }
    else if(selected_dist == 'haifa'){
        cities = ['Haifa', 'Hadera', 'Givat Ada', 'Qiryat Motzkin','Or Akiva','Aviel']
    }
    else if(selected_dist == 'center'){
        cities = ['Tel-Aviv','Kfar Saba','Herzliya','Givatayim','Ramat Gan', 'Kfar Yona','Netanya', 'Jerusalem']
     }
    else{ 
        cities = ["Beer Sheva", "Eilat", "Ashkelon", "Ashdod", "Qiryat Malachi"]       
    }
    var shuffled = shuffle(cities)
    var selected_city = shuffled.slice(0,Math.floor(Math.random()+1))
    var house_number = Math.floor(Math.random()*30+1)
    return {address:`${selected_city}, ${house_number}, ${selected_dist} district`, district:selected_dist[0]}
 };


 function genereatePrice(items) {
    var price = 0;
    var tax_status = "";
    for(var i = 0; i<items.length; i++) {
        price += items[i].price
    }
    if (price < 50) {
        tax_status = "Free"
    }
    else if (price > 50 && price < 75) {
        tax_status = "10%"
    }
    else {
        tax_status = "25%"
    }
    return {price:price,tax_status:tax_status}
 }

 function generateName(name) {
   if(name){
       return name;
   }  
   else{
       name = 'john doe'
   }
   return name;
 } 
 function getFullDate() {
    var d = new Date(),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}
 function createRandomShipment(products) {
    var items = generateItems(products)
    var price = genereatePrice(items.items)
    var address = generateAdress()
    
    var package = {
        serial_number : generateSerial(),
        recv_name : generateName(),
        items : items.items,
        size : items.size,
        shipping_date : getFullDate(),
        price : price.price,
        tax_status : price.tax_status,
        address : address.address, 
        district : address.district,
        status : "On Route"
    }
    return package
 } 


 function SimShipment(products){
    console.log('started simShipment')
    var package = createRandomShipment(products);
    const result = generator.generate(package,package.serial_number);
    console.log(package)

    //save meta-data to redis   
    redisClient.incrby('TOTAL',1, (err,reply)=>{console.log(reply)})
    redisClient.incrby('ON_ROUTE',1,(err,reply)=>{console.log(reply)})
    redisClient.hincrby(package.district,"TOTAL", 1,(err,reply)=>{console.log(reply)})
    redisClient.hincrby(package.district,"ON_ROUTE",1,(err,reply)=>{console.log(reply)})
    
    //save package to redis
    redisClient.hmset(package.serial_number,'serial_num',package.serial_number,'items',`${JSON.stringify(package.items)}`,
    'size',package.size,'tax_status',package.tax_status,'address',package.address,'district',package.district,
    'status',package.status);
    redisClient.publish('message', JSON.stringify(package),() =>{console.log('publish')});
 }
redisClient.on('connect', function () {
    console.log('Simulator connected to Redis');
});
server.listen(6062, function () {
    console.log('Simulator is running on port 6062');
});


setInterval(SimShipment,3500,products)



