let express = require("express");
let User = require("../models/User");
let router = express.Router();

//create a user using : POST '/api/auth' . Doesn't require Auth
router.get("/", (req, res) => {
  // res.send("hello");
  const user = User(req.body);
  user.save();
  res.send(req.body);
  console.log(req.body);
});

module.exports = router;
