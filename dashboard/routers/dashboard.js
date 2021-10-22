
const express =require('express')
const router = express.Router()
var datafile = require('./data')

router.get('/', async (req, res) => {
  var data = {
    card_data : await datafile.getCardData(),
    price_data: (await datafile.getPriceData()).price
  }
  res.render("pages/dashboard", data)
})

module.exports = router