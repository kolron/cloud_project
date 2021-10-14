const express =require('express')
const router = express.Router();

router.get('/',(req,res)=>{
  res.render('pages/findPackage')
})

router.get('/submitPackage', (req,res)=>{
  var data = {
    recv_num:req.query.recv_num,
  }
  
res.send(data)
})
module.exports = router