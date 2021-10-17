const express = require('express')
const app = express()
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient(6379)
var {createURLandDelete} = require('./createDelete')

var parsed_package
async function parseData(){
    const results = await createURLandDelete()
    for (const obj of results){
        var val = obj
        val = (val.toString())
        var point_index = val.search('points')
        var res = val.substring(11,point_index - 4)
        try{ 
        parsed_package = JSON.parse(res)
        } catch(e)
        {
            console.log(res)
            console.error(e)
        }
        console.log(parsed_package.serial_number)
        console.log('=============================================')
        redisClient.publish("arrival",parsed_package.serial_number,() =>{console.log('published')})
    }
}


redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});

const run = async () =>{
while(true){
console.log('running')
await new Promise(resolve => setTimeout(resolve,10000))
await parseData()}
}
run()
module.exports = { run }