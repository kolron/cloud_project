const express = require('express');
const app = express();
const dashboard = require('./routers/dashboard')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/dashboard',dashboard)

const port = 3000

app.get('/', (req, res) => {
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



app.get('/package_info',(req,res)=>{
  res.render('pages/package_info')
})

app.get('/sendPackage', (req,res)=>{
  var data = {
    sender_name:req.query.sender_name,
    recv_name:req.query.recv_name,
    shipping_date:req.query.shipping_date,
    shipping_area:req.query.shipping_area,
    volume:req.query.volume,
    weight:req.query.weight,
              }
res.send(data)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})