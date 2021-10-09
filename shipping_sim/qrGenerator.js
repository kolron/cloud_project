//https://www.geeksforgeeks.org/generate-a-qr-code-in-node-js/

// Require the package
const QRCode = require('qrcode')
const FB = require('../firebase/upload2FB.js')
const fs = require('fs')

const generate = async(data,name) => {
    let filename = `../firebase/${name}.png`
    let stringdata = JSON.stringify(data)
    QRCode.toFile(filename,stringdata, function (err, code) {
        if(err) return console.log("error occurred")
    })
    console.log("Uploading img file to Firebase...")
    await FB.uploadFile(filename)
    fs.unlink(filename,(err)=>{
        if (err) {
            console.error(err)
        }
        console.log('deleted file')
    })

}

module.exports = { generate };
