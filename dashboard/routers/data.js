
const redis = require('redis')
const util = require('util')
const redisClient = redis.createClient()
redisClient.get = util.promisify(redisClient.get)
redisClient.hget = util.promisify(redisClient.hget)

 async function getData(){
    var data = {
        cards: [
          {districtId:"north", title: "צפון", value: await redisClient.hget('north','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart" */},  
          {districtId:"haifa", title: "חיפה", value: await redisClient.hget('haifa','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "content_copy" */},
          {districtId:"central", title: "מרכז", value: await redisClient.hget('central','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "info_outline"*/ },
          {districtId:"tel aviv", title: "תל אביב", value: await redisClient.hget('tel aviv','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "store"*/ },
          {districtId:"jerusalem", title: "ירושלים", value: await redisClient.hget('jerusalem','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart" */},
          {districtId:"samaria", title: "יהודה ושומרון", value: await redisClient.hget('samaria','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart" */},
          {districtId:"south", title: "דרום", value: await redisClient.hget('south','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart"*/ }
          
        ]
      }
    return data
}

module.exports = {getData}