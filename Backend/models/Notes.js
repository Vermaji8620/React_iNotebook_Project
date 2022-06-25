const mongoose = require("mongoose");
let { Schema } = mongoose;

const notesschema = new mongoose.Schema({
  user: {
    // importing the id from a different route source
    type: mongoose.Schema.Types.ObjectId,
    //now defining the model name given in User.js
    ref: "user",
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", notesschema);
