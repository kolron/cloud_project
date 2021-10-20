
const express =require('express')
const router = express.Router()
const redis = require('redis')
const util = require('util')
const redisClient = redis.createClient()
const sub = redis.createClient()



redisClient.get = util.promisify(redisClient.get)
redisClient.hget = util.promisify(redisClient.hget)
var datafile = require('./data')

router.get('/', async (req, res) => {
  var data = await datafile.getData()
  res.render("pages/dashboard", data)
})

module.exports = router