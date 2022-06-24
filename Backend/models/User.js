// User.js me hm basically ek schema bana rha hai(hm aisa smajh skte hai ki ek schema ka matlb ki jo v hm credentials dena chah rahe hai apne input k andar me, uske liye jagah banaana), to jb hm mongoose ko bolte hai ye sbhi credentials ka jagah mere ko bana k do, to ye chiz schema kehlata hai, aur jb yehi mongoose database ka andar wo jagah bana deta hai, to hm usko model bolte hai, i.e. model is the compiled form of schema

const mongoose = require("mongoose");
let { Schema } = mongoose;

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// niche me model k name 'user' hai and schema ka naam 'userschema'(ye schema ka naam hai jo ki upar me assign kr diya gaya hai)--
const user = mongoose.model("user", userschema);
module.exports = user;
