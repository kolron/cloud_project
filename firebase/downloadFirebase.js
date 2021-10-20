

var fs = require('fs'),
request = require('request');
async function download(uri, filename){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(`images/${filename}`)).on('close',()=>{});  
  });
};

module.exports = {download}
 