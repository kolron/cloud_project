//https://www.geeksforgeeks.org/generate-a-qr-code-in-node-js/

// Require the package
const QRCode = require('qrcode')
const FB = require('../firebase/upload2FB.js')
const fs = require('fs')

async function checkQR(filename,data){
    
    const {size} = fs.statSync(filename)
    if(size< 150)
    {
        console.log('error in creating file')
        QRCode.toFile(filename,data)
        checkQR(filename,data)
        await new Promise(resolve => setTimeout(resolve,1000))
    }
    else{
        console.log("QR valid")
    }
}

const generate = async(data,name) => {
    let filename = `../firebase/${name}.png`
    let stringdata = JSON.stringify(data)
    QRCode.toFile(filename,stringdata, function (err, code) {
        if(err) return console.log("error occurred")
    })
    await new Promise(resolve => setTimeout(resolve,1000))
    await checkQR(filename,stringdata)
    console.log('--------------------------------------------\n-------------------------------\n----------------------------------\n---------------------------')
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
