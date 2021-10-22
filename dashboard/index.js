const express = require('express');
const app = express();
const port = 3000
const server = require("http").createServer(app)
const io = require('socket.io')(server)
const dashboard = require('./routers/dashboard')
const sendPackage = require('./routers/sendPackage')
const findPackage = require('./routers/findPackage')
const map = require('./routers/map');
const redis = require('redis')
const sub = redis.createClient()
const {getCardData, getPriceData} = require('./routers/data')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/dashboard',dashboard)
app.use('/sendPackage',sendPackage)
app.use('/findPackage',findPackage)
app.use('/map',map)
sub.subscribe('update')

server.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})

io.on('connection',(socket)=>{
  console.log('Socket connection active')
})

sub.on('message',async(channel,data)=>{
  if(channel =='update'){
  console.log('io recieved update')
  var card_result = await getCardData()
  io.emit('update card',card_result)
  
  var price_result = (await getPriceData()).price
  console.log(price_result)
  io.emit('update barchart',price_result)
  }
})
app.get('/', (req, res) => {
  res.render("pages/home")
})
