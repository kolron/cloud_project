
const express =require('express')
const router = express.Router()
var datafile = require('./data')

router.get('/', async (req, res) => {
  var card_data = await datafile.getCardData()
  var data = {
    price_data: (await datafile.getPriceData()).price,
    
    
    card1: [
      card_data.cards[0],
      card_data.cards[1],
      card_data.cards[2],
      card_data.cards[3]
    ],
     card2: [
      card_data.cards[4],
      card_data.cards[5],
      card_data.cards[6],
      card_data.cards[7]
     ]}
  
  res.render("pages/dashboard", data)
})

module.exports = router