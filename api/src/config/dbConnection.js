const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_CONNECTING_STRING;

const dbConnect = function () {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Mongo DB Connected");
    })
    .catch(() => {
      console.log("Mongo Db NOT Connected");
    });
};

module.exports={mongoose,dbConnect}