
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
    {districtnum:0, districtid:"north", title: "צפון", value: await redisClient.hget('north','TOTAL_PRICE')},  
    {districtnum:1, districtid:"haifa", title: "חיפה", value: await redisClient.hget('haifa','TOTAL_PRICE')},
    {districtnum:2, districtid:"central", title: "מרכז", value: await redisClient.hget('central','TOTAL_PRICE')},
    {districtnum:3, districtid:"tel aviv", title: "תל אביב", value: await redisClient.hget('tel aviv','TOTAL_PRICE')},
    {districtnum:4, districtid:"jerusalem", title: "ירושלים", value: await redisClient.hget('jerusalem','TOTAL_PRICE')},
    {districtnum:5, districtid:"samaria", title: "יהודה ושומרון", value: await redisClient.hget('samaria','TOTAL_PRICE')},
    {districtnum:6, districtid:"south", title: "דרום", value: await redisClient.hget('south','TOTAL_PRICE')}

  ]
  
  priceInfo.forEach(obj => {
    var value = obj.value
    prices[obj.districtnum]= ((value != null) ? value : 0 )
  });  

  var data = { price:prices }
  return data
}
async function getTaxData(){
  var average_tax = [];
  var taxInfo = [
    {districtnum:0 ,districtid:"north", title: "צפון"},  
    {districtnum:1 ,districtid:"haifa", title: "חיפה"},
    {districtnum:2 ,districtid:"central", title: "מרכז"},
    {districtnum:3 ,districtid:"tel aviv", title: "תל אביב"},
    {districtnum:4 ,districtid:"jerusalem", title: "ירושלים"},
    {districtnum:5 ,districtid:"samaria", title: "יהודה ושומרון"},
    {districtnum:6 ,districtid:"south", title: "דרום"}
  ]
  
  for(const obj of taxInfo){
    var total_tax = await redisClient.hget(`${obj.districtid}`,'TOTAL_TAX')
    var total = await redisClient.hget(`${obj.districtid}`,'TOTAL')
    if(total_tax == null || total == null){
      average_tax[obj.districtnum] = 0
    }
    else{
      var result = total_tax/total;
      average_tax[obj.districtnum] = result.toFixed(2)
    }
  }
  var data = { tax:average_tax }
  return data
}

module.exports = {getCardData,getPriceData,getTaxData}