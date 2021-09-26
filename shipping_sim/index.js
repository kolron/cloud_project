const express = require('express')
const app = express()
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()


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
    
var products ={'earphones':10, 'phone case':2, 'pillow':20,
     'shoes':50,'laptop':200,'backpack':50,'type-C cable':3,
     'mug':1,'mouse':20,'keyboard':20,'batteries':1};
    
function generateItems(items) {
    let shuffled = shuffle(items)
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
    return
}




function generateQR(json){}

function createRandomShipment(products) {
    var items = generateItems(products)

    var package = {
        serial_number : generateSerial(),
        items : items.items,
        size : items.size,
        tax_status : generateTaxStatus(),
        address : generateAdress().address,
        district : generateAdress.district
    }
    return package
}


// function that simulates that a shipment has been sent
// Sends the package with its info to redis, and uploads a QRcode to firebase
// later on (part of another module) the QRcode will be retrived,read and be dealt with.
  function SimShipment(package){}
