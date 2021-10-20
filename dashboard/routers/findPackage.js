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

    let res = await collection.findOne(query, { projection: { _id: 0 } });

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
  console.log(package);
  var status;
  if (package) {
    status = "ok";
    var package_info = JSON.stringify(package, null, 2);
    var package_top_end = package_info.indexOf("items");
    var package_top = package_info.substring(1, package_top_end - 2);
    var package_items_start = package_info.indexOf("[");
    var package_items_end = package_info.indexOf("]");
    var package_items = package_info.substring(
      package_items_start + 1,
      package_items_end
    );
    var data = {
      status: status,
      package_top: package_top,
      package_items: package_items,
    };
  } else {
    status = "bad";
    var data = { status: status, package_top: "", package_items: "" };
  }

  res.render("pages/locatePackage", data);
});

module.exports = router;
