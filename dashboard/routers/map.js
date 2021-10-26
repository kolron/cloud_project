
const express =require('express')
const router = express.Router()
var datafile = require('./data')



router.get('/', async (req, res) => {
  var pack_data = await datafile.getCardData()
  var data = {
    card1: [
     pack_data.cards[2]
    ],
    card2: [
      pack_data.cards[1]
    ],
    card3: [
      pack_data.cards[5]
    ],
    card4: [
     pack_data.cards[3],
     pack_data.cards[0]
    ],
    card5: [
      pack_data.cards[6],
     pack_data.cards[7]
    ]}
  
  res.render("pages/map", data)
})


module.exports = router