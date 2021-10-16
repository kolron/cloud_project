
const express =require('express')
const { resolve } = require('path')
const router = express.Router()
const redis = require('redis')
const util = require('util')
const redisClient = redis.createClient()
redisClient.get = util.promisify(redisClient.get)




  
router.get('/', async (req, res) => {
  var data = {
    cards: [
      {districtId:"north", title: "צפון", value: await redisClient.hget('north','TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" },  
      {districtId:"haifa", title: "חיפה", value: await redisClient.get('TOTAL'), unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "content_copy" },
      {districtId:"central", title: "מרכז", value: 3500, unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "info_outline" },
      {districtId:"tel aviv", title: "תל אביב", value: 1500, unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "store" },
      {districtId:"jerusalem", title: "ירושלים", value: 700, unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" },
      {districtId:"samaria", title: "יהודה ושומרון", value: 700, unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" },
      {districtId:"south", title: "דרום", value: 700, unit: " חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" }
      
    ]
  }
  res.render("pages/dashboard", data)
})


module.exports = router