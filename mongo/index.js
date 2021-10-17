const express = require("express");
const app = express();
var server = require("http").Server(app);
const redis = require("redis");
const redisClient = redis.createClient();
const sub = redis.createClient();
sub.subscribe("arrival");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://ron:ron@cluster0.x3cfx.mongodb.net/test?retryWrites=true&w=majority";
sub.on("message", (channel, data) => {
  if (channel == "arrival") {
    redisClient.hgetall(data, (err, object) => {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("connected to mongo!");
        var dbo = db.db("project");
        dbo.collection('pack_arrived').insertOne(object, (ers, res) => {
          if (err) throw err;
          console.log("inserted document");
          db.close();
        });
      });
      redisClient.hincrby(object.district,"ARRIVED",1)
    });
    redisClient.decr('ON_ROUTE')
    redisClient.incr('ARRIVED')
  }
});

redisClient.on("connect", (err, reply) => {
  console.log("connected to redis");
});

server.listen(6064, (err, reply) => console.log("listening on port 6064"));
