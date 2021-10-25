var fs = require('fs');
var json2csv = require('json2csv').parse;
const path = require("path");
var newLine = '\r\n';
const redisClient = require('redis').createClient()
const util = require('util')
redisClient.hget = util.promisify(redisClient.hget)


async function add2data(d){

    var writeStream = fs.createWriteStream('../bigml/data/test.csv',{flags:'a+'})
    var toWrite = "";
    for(var i = 0; i < d.length;i++){
            toWrite+=d[i] 
        if(i < d.length-1)
        toWrite+=';'
    }
    writeStream.write(toWrite+'\n')
    }

async function parseItems(package){
var itemlist = [];
var items = await redisClient.hget(package,'items')
var json = JSON.parse(items)
json.forEach(obj => {
    itemlist.push(obj.name);
});
return itemlist;
}



module.exports = {parseItems,add2data}


