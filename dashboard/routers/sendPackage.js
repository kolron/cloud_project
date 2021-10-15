
const express =require('express')
//const sim  = require("../../shipping_sim/index")
const router = express.Router();


router.get('/',(req,res)=>{
  res.render('pages/sendPackage')
})

router.get('/submitPackage', (req,res)=>{
  
  var items = sim.generateItems()
  var price = genereatePrice(items.items)
  
  var data = {

    items: sim.generateItems(),
    size : items.size,
    price : price.price,
    tax_status : price.tax_status,
    recv_name:req.query.recv_name,
    shipping_date:sim.getFullDate(),
    district:req.query.shipping_area,
    serial_num: sim.generateSerial(),
    status:"On Route"
  }

})
module.exports = router