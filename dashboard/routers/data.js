
const redis = require('redis')
const util = require('util')
const redisClient = redis.createClient()
redisClient.get = util.promisify(redisClient.get)
redisClient.hget = util.promisify(redisClient.hget)

 async function getCardData(){
    var data = {
        cards: [
          {districtid:"north", title: "צפון", value: await redisClient.hget('north','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart" */},  
          {districtid:"haifa", title: "חיפה", value: await redisClient.hget('haifa','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "content_copy" */},
          {districtid:"central", title: "מרכז", value: await redisClient.hget('central','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "info_outline"*/ },
          {districtid:"tel aviv", title: "תל אביב", value: await redisClient.hget('tel aviv','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "store"*/ },
          {districtid:"jerusalem", title: "ירושלים", value: await redisClient.hget('jerusalem','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart" */},
          {districtid:"samaria", title: "יהודה ושומרון", value: await redisClient.hget('samaria','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart" */},
          {districtid:"south", title: "דרום", value: await redisClient.hget('south','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע" /*icon: "add_shopping_cart"*/ }
          
        ]
      }
    return data
}
async function getPriceData(){
  var data = {
      prices: [
        {districtid:"north", title: "צפון", value: await redisClient.hget('north','TOTA_PRICE')},  
        {districtid:"haifa", title: "חיפה", value: await redisClient.hget('haifa','TOTA_PRICE')},
        {districtid:"central", title: "מרכז", value: await redisClient.hget('central','TOTA_PRICE')},
        {districtid:"tel aviv", title: "תל אביב", value: await redisClient.hget('tel aviv','TOTA_PRICE')},
        {districtid:"jerusalem", title: "ירושלים", value: await redisClient.hget('jerusalem','TOTA_PRICE')},
        {districtid:"samaria", title: "יהודה ושומרון", value: await redisClient.hget('samaria','TOTA_PRICE')},
        {districtid:"south", title: "דרום", value: await redisClient.hget('south','TOTA_PRICE')}
        
      ]
    }
  return data
}

module.exports = {getCardData,getPriceData}