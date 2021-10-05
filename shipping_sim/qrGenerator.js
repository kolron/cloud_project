//https://www.geeksforgeeks.org/generate-a-qr-code-in-node-js/

// Require the package
const QRCode = require('qrcode')


function generate(data) {
    let stringdata = JSON.stringify(data)
    QRCode.toFile("./test.png",stringdata, function (err, code) {
        if(err) return console.log("error occurred")
    })
}

module.exports = { generate };