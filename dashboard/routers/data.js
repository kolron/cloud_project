
const { Console } = require('console')
const { SSL_OP_NETSCAPE_CHALLENGE_BUG } = require('constants')
const redis = require('redis')
const util = require('util')
const redisClient = redis.createClient()
redisClient.get = util.promisify(redisClient.get)
redisClient.hget = util.promisify(redisClient.hget)

 async function getCardData(){
    var data = {
        cards: [
          {districtid:"north", title: "צפון", value: `${await redisClient.hget('north','ARRIVED')}/${await redisClient.hget('north','TOTAL')} `, unit: " חבילות"},  
          {districtid:"haifa", title: "חיפה", value: `${await redisClient.hget('haifa','ARRIVED')}/${await redisClient.hget('haifa','TOTAL')} `, unit: " חבילות"},
          {districtid:"central", title: "מרכז", value: `${await redisClient.hget('central','ARRIVED')}/${await redisClient.hget('central','TOTAL')} `, unit: " חבילות" },
          {districtid:"tel aviv", title: "תל אביב", value: `${await redisClient.hget('tel aviv','ARRIVED')}/${await redisClient.hget('tel aviv','TOTAL')} `, unit: " חבילות"},
          {districtid:"jerusalem", title: "ירושלים", value: `${await redisClient.hget('jerusalem','ARRIVED')}/${await redisClient.hget('jerusalem','TOTAL')} `, unit: " חבילות"},
          {districtid:"samaria", title: "יהודה ושומרון", value: `${await redisClient.hget('samaria','ARRIVED')}/${await redisClient.hget('samaria','TOTAL')} `, unit: " חבילות"},
          {districtid:"south", title: "דרום", value: `${await redisClient.hget('south','ARRIVED')}/${await redisClient.hget('south','TOTAL')} `, unit: " חבילות"} 
        ]
      }
      data.cards.forEach(card => {
        if(card.value.includes('null')){
          var new_value = card.value.replace(/null/g, '0')
          card.value = new_value
        }
      })
      console.log(data)
    return data
}
async function getPriceData(){
  var prices = [];
  var priceInfo = [
    {districtid:"north", title: "צפון", value: await redisClient.hget('north','TOTAL_PRICE')},  
    {districtid:"haifa", title: "חיפה", value: await redisClient.hget('haifa','TOTAL_PRICE')},
    {districtid:"tel aviv", title: "תל אביב", value: await redisClient.hget('tel aviv','TOTAL_PRICE')},
    {districtid:"central", title: "מרכז", value: await redisClient.hget('central','TOTAL_PRICE')},
    {districtid:"jerusalem", title: "ירושלים", value: await redisClient.hget('jerusalem','TOTAL_PRICE')},
    {districtid:"samaria", title: "יהודה ושומרון", value: await redisClient.hget('samaria','TOTAL_PRICE')},
    {districtid:"south", title: "דרום", value: await redisClient.hget('south','TOTAL_PRICE')}

  ]
  
  priceInfo.forEach(obj => {
    var value = obj.value
    prices.push((value != null) ? value : 0 )
  });  

  var data = { price:prices }
  return data
}
// async function getTaxData(){
//   var prices = [];
//   var priceInfo = [
//     {districtid:"north", title: "צפון", value: await redisClient.hget('north','TOTAL_PRICE')},  
//     {districtid:"haifa", title: "חיפה", value: await redisClient.hget('haifa','TOTAL_PRICE')},
//     {districtid:"central", title: "מרכז", value: await redisClient.hget('central','TOTAL_PRICE')},
//     {districtid:"tel aviv", title: "תל אביב", value: await redisClient.hget('tel aviv','TOTAL_PRICE')},
//     {districtid:"jerusalem", title: "ירושלים", value: await redisClient.hget('jerusalem','TOTAL_PRICE')},
//     {districtid:"samaria", title: "יהודה ושומרון", value: await redisClient.hget('samaria','TOTAL_PRICE')},
//     {districtid:"south", title: "דרום", value: await redisClient.hget('south','TOTAL_PRICE')}

//   ]
  
//   priceInfo.forEach(obj => {
//     var value = obj.value
//     prices.push((value != null) ? value : 0 )
//   });  

//   var data = { price:prices }
//   return data
// }

module.exports = {getCardData,getPriceData}