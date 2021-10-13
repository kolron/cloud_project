const express =require('express')
const router = express.Router();
const reader = require("../../firebase/qrcoderReader");


router.get('/',(req,res)=>{
  res.render('pages/findPackage')
})

router.get('/submitPackage', (req,res)=>{
  var data = {
    recv_num:req.query.recv_num,
  }
  
const result = reader.scanner(data);
res.send(data)
})
module.exports = router