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
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/dashboard',dashboard)
app.use('/sendPackage',sendPackage)
app.use('/findPackage',findPackage)
app.use('/map',map)
sub.subscribe('message')

server.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})

io.on('connection',(socket)=>{
  console.log('Socket connection active')
  console.log(`user id: ${socket.id}`)
  sub.on('message',(channel,data)  => {
    io.emit('test',data)
  })
})

app.set('socketio',io)

app.get('/', (req, res) => {
  res.render("pages/home")
})
