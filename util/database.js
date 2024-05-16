const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017")
    .then((client) => {
      console.log("connection established successfully");
      _db = client.db("EasyTech");
      callback();
    })
    .catch((err) => {
      console.log("error connecting to Mongodb !!" + err);
      throw err;
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
