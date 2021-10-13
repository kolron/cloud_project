const { Storage } = require("@google-cloud/storage");
const { download } = require("./downloadFirebase");
let { PythonShell } = require("python-shell");
const fs = require("fs");
const storage = new Storage({
  keyFilename:
    "../firebase/ariel2021-359ba-firebase-adminsdk-gjphe-608cbd9cd4.json",
});
let bucketName = "gs://ariel2021-359ba.appspot.com";
let myBucket = storage.bucket(bucketName);

async function generateSignedUrl(filename) {
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 1000 * 60,
  };
  const [url] = await myBucket.file(filename).getSignedUrl(options);
  console.log("-------------------------------------------");
  return url;
}

function pythonPromise(name) {
  return new Promise(async (resolve, reject) => {
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      //Path to your script
      args: name,
    };
    await PythonShell.run("../firebase/qrcodeReader.py", options, function (err, results) {
      if (err) throw err;

      resolve(results[3]);
    });
  });
}

async function listAllFiles() {
  var results = [];
  var count = 0;
  const [files] = await myBucket.getFiles();
  if (files.length != 0) {
    for (const file of files) {
      if (count < 5) {
        var url = await generateSignedUrl(file.name).catch(console.error);
        await download(url, file.name).catch(console.error);
        var res = await pythonPromise(file.name);
        results.push(res);
        file.delete().then(function (data) {
          const apiResponse = data[0];
        });
        fs.unlink("images/" + file.name, (err) => {
          if (err) {
            console.error(err);
          }
          console.log("deleted file");
        });
        count++;
      } else {
        return results;
      }
    }
  } else {
    console.log("No files currently");
  }
  return results;
}

async function createURLandDelete() {
  var results = await listAllFiles().catch(console.error);
  return results;
}

module.exports = { createURLandDelete };
