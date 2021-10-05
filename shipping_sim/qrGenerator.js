//https://www.geeksforgeeks.org/generate-a-qr-code-in-node-js/

// Require the package
const QRCode = require('qrcode')
const FB = require('../firebase/upload2FB.js')

const generate = async(data,name) => {
    let filename = `../firebase/${name}.png`
    let stringdata = JSON.stringify(data)
    QRCode.toFile(filename,stringdata, function (err, code) {
        if(err) return console.log("error occurred")
    })
    console.log("Uploading img file to Firebase...")
    await new Promise(resolve => setTimeout(resolve, 2000));
    FB.uploadFile(filename)
}

module.exports = { generate };
