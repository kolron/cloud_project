const { Storage } = require("@google-cloud/storage");
const { download } = require("./downloadFirebase");
const { scan } = require("./qrcoderReader");
const storage = new Storage({
  keyFilename:
    "../firebase/ariel2021-359ba-firebase-adminsdk-gjphe-608cbd9cd4.json",
});
let bucketName = "gs://ariel2021-359ba.appspot.com";
let myBucket = storage.bucket(bucketName);

/*
This files export function scanns our bucket in firebase
and creates a url that contains the image we want to scan
this url is temporary and lasts for 1 minute 
url is genereated in the console, can be passed as an argument i suppose
afterwards it deletes the file from which the url was generated, clearing the firebase.
OPTION: instead of having the index.js call this function, and pass the url to the QRscanner,
we can pass this to the scanner here(might be simpler to do so).
*/
async function generateSignedUrl(filename) {
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 1000 * 60,
  };
  const [url] = await myBucket.file(filename).getSignedUrl(options);
  console.log("-------------------------------------------");
  console.log(`Creating a signed url for ${filename}`);
  console.log("url created");
  return url;
}
async function listAllFiles() {
  console.log("Checking for files");
  const [files] = await myBucket.getFiles();
  if (files.length != 0) {
    for (const file of files) {
      console.log(`Generating url for ${file.name}`);
      url = await generateSignedUrl(file.name).catch(console.error);
      //await download(url);
      //await scan(file.name);
      await file.delete(function (err, apiResponse) {console.log('deleted file')});
    }
  }
}

async function createURLandDelete(timeout) {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, timeout));
    listAllFiles().catch(console.error);
  }
}
createURLandDelete(2000);
module.exports = { createURLandDelete };