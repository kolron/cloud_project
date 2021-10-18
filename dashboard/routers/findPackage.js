const express = require("express");
const router = express.Router();
const redisClient = require("redis").createClient();
const util = require("util");
redisClient.get = util.promisify(redisClient.get);
redisClient.hgetall = util.promisify(redisClient.hgetall)
router.use(express.static('public'))
redisClient.on("error", (err) => {
  console.catch(err);
}); 

router.get("/", (req, res) => {
  res.render("pages/findPackage");
});

router.get("/locate", async (req, res) => {
  var ser_num = (req.query.recv_name).toString();
  var package = await redisClient.hgetall(ser_num)
  console.log(package)
  var status;
  if (package)
  {
    status = 'ok'
    var data = { status: status, package_info: JSON.stringify(package,null,2)};
  }
  else{
     status = 'bad'
     var data = { status: status, package_info:''};
  }

res.render("pages/locatePackage", data);
})

module.exports = router;
