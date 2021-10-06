
const express =require('express')
const router = express.Router();
const generator = require("../../shipping_sim/qrGenerator");

router.get('/',(req,res)=>{
  res.render('pages/sendPackage')
})

router.get('/submitPackage', (req,res)=>{
  var data = {
    sender_name:req.query.sender_name,
    recv_name:req.query.recv_name,
    shipping_date:req.query.shipping_date,
    shipping_area:req.query.shipping_area,
    volume:req.query.volume,
    weight:req.query.weight,
  }
const result = generator.generate(data);
res.send(data)
})
module.exports = router