const express = require('express');
const app = express();
const dashboard = require('./routers/dashboard')
const sendPackage = require('./routers/sendPackage')
const findPackage = require('./routers/findPackage')
const map = require('./routers/map')
const http = require('http');
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/dashboard',dashboard)
app.use('/sendPackage',sendPackage)
app.use('/findPackage',findPackage)
app.use('/map',map)

const port = 3000

app.get('/', (req, res) => {
  res.render("pages/home")
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})