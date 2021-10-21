const express = require("express");
const router = express.Router();
const redisClient = require("redis").createClient();
const util = require("util");
redisClient.get = util.promisify(redisClient.get);
redisClient.hgetall = util.promisify(redisClient.hgetall);
router.use(express.static("public"));
redisClient.on("error", (err) => {
  console.catch(err);
});
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://ron:ron@cluster0.x3cfx.mongodb.net/test?retryWrites=true&w=majority";

router.get("/", (req, res) => {
  res.render("pages/findPackage");
});




function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

async function findOne(name) {
  const client = await MongoClient.connect(url).catch((err) => {
    console.log(err);
  });
  if (!client) {
    return;
  }

  try {
    const db = client.db("project");

    let collection = db.collection("packages");

    let query = { serial_number: name };


    let res = await collection.findOne(query);


    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

router.get("/locate", async (req, res) => {
  var ser_num = req.query.recv_name.toString();
  var package = await findOne(ser_num);
  // var package = await redisClient.hgetall(ser_num)

  // console.log(package)
  var status;
  if (package)
  {
    status = 'ok'
    var package_info = JSON.stringify(package,null,2)

    var package_top_start = package_info.indexOf('serial_number":')
    var package_top_end = package_info.indexOf('items":')
    var package_top = package_info.substring(package_top_start - 2, package_top_end -2 )

    var package_items_start = package_info.indexOf('[')
    var package_items_end = package_info.indexOf(']')
    var package_items = package_info.substring(package_items_start + 1 ,package_items_end)

    var count = (package_info.match(/{/g) || []).length - 1;
    console.log(count)
    var names = []
    var prices = []
    for (let i = 0; i < count; i++) {
      var start_names = getPosition(package_items, 'name', i + 1) + 9
      var end_names = getPosition(package_items, 'price', i + 1) - 5
      var name = package_items.substring(start_names ,end_names)

      var start_prices = getPosition(package_items, 'price', i + 1) + 8
      var end_prices = getPosition(package_items, '}', i + 1)
      var price = package_items.substring(start_prices ,end_prices)
      
      console.log(name)
      console.log(price)
      names[i] = name
      prices[i] = price
    }

    var data = { status: status, package_top: package_top, package_items: package_items, names: names, prices: prices, count: count};
  }
  else{
     status = 'bad'
     var data = { status: status, package_top: "", package_items: ""};

  }

  res.render("pages/locatePackage", data);
});

module.exports = router;
