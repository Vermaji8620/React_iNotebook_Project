let mongoose = require("mongoose");
let mongoURI = "mongodb://localhost:27017/";

let connecttomongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongodb successfully");
  });
};
module.exports = connecttomongo;
