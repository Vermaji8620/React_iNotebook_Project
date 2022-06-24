//yaha pe jo v kuch likha ja rha hai, wo sb mongodb database se connect hone k liye likha ja rha hai-----,   aur connect krne k baad isko index.js me export kr de rhe hai----waha pe server se connect hone ka baat kiya ja rha hai----

//to yaha pe sirf database connection ban rha hai----


let mongoose = require("mongoose");
let mongoURI = "mongodb://localhost:27017/iNoteBook";

let connecttomongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongodb successfully");
  });
};
module.exports = connecttomongo;