const express = require('express');
const app = express();
const dashboard = require('./routers/dashboard')
const sendPackage = require('./routers/sendPackage')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const generator = require("../shipping_sim/qrGenerator");
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/dashboard',dashboard)
app.use('/sendPackage',sendPackage)

const port = 3000

app.get('/',(req,res) => 
{
  res.render('./pages/index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})