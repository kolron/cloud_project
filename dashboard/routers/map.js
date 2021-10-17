
const express =require('express')
const router = express.Router()
var datafile = require('./data')



router.get('/', async (req, res) => {
  var pack_data = await datafile.getData()
  var data = {
    card1: [
     pack_data.cards[2]
    ],
    card2: [
      pack_data.cards[1]
    ],
    card3: [
      pack_data.cards[0]
    ],
    card4: [
     pack_data.cards[3],
     pack_data.cards[4]
    ],
    card5: [
      pack_data.cards[5],
     pack_data.cards[6]
    ]}
  
  res.render("pages/map", data)
})


module.exports = router