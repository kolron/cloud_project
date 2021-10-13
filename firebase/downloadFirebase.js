// const fs = require('fs');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// async function download(url,filename) {
//   const response = await fetch(url);
//   const buffer = await response.buffer();
//   fs.writeFile(filename, buffer, () => 
//     console.log('finished downloading!'));
// }

var fs = require('fs'),
request = require('request');
async function download(uri, filename){
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(`../firbase/images/${filename}`)).on('close',()=>{});  
  });
};

module.exports = {download}
 