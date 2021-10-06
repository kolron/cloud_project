
const express =require('express')
const router = express.Router()

// router.get('/', (req, res) => {
//     var data = {
//       cards:[
//        {title: "Dan Cluster", value: 1500, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:"toll",mainIcon:"tour"},
//        {title: "Haifa", value: 320, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:"flight_land",mainIcon:"turned_in"},
//        {title: "Samaria", value: 500, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:"turned_in_not",mainIcon:"anchor"},
//        {title: "South", value: 100, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:'hourglass_full',mainIcon:"flaky"}
//       ]
//     }
//     res.render("pages/dashboard",data)
//   })

// module.exports = router
router.get('/', (req, res) => {
  var data = {
    cards: [
      {districtId:"north", title: "צפון", value: 3500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" },  
      {districtId:"haifa", title: "חיפה", value: 500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "content_copy" },
      {districtId:"central", title: "מרכז", value: 3500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "info_outline" },
      {districtId:"tel aviv", title: "תל אביב", value: 1500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "store" },
      {districtId:"jerusalem", title: "ירושלים", value: 700, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" },
      {districtId:"samaria", title: "יהודה ושומרון", value: 700, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" },
      {districtId:"south", title: "דרום", value: 700, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" }
      
    ]
  }
  res.render("pages/dashboard", data)
})



// router.get('/sendPackage',(req,res)=>{
//   res.render('pages/sendPackage')
// })

// router.get('/sendPackage', (req,res)=>{
//   var data = {
//     sender_name:req.query.sender_name,
//     recv_name:req.query.recv_name,
//     shipping_date:req.query.shipping_date,
//     shipping_area:req.query.shipping_area,
//     volume:req.query.volume,
//     weight:req.query.weight,
//   }
// const result = generator.generate(data);
// res.send(data)
// })
module.exports = router