const {Storage} = require('@google-cloud/storage');
const express = require("express");
const { v4:uuidv4 } = require('uuid');

const app = new express();
const storage = new Storage({
    keyFilename: "../firebase/ariel2021-359ba-firebase-adminsdk-gjphe-608cbd9cd4.json"
    /*goto project settings (wheel at left top)
    service accounts->click generate new private key
    you will have a key file downloaded - copy to this folder*/
});
let bucketName = "gs://ariel2021-359ba.appspot.com"


// Testing out upload of file
const uploadFile = async(filename) => {
  
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        //gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            metadata :{
              firebaseStorageDownloadTokens: uuidv4(),
              contentType:'image/png'
        }
    },
});

console.log(`${filename} uploaded to ${bucketName}.`);
}

module.exports = {uploadFile}

//app.listen(process.env.PORT || 8088, () => { console.log('node server running');})