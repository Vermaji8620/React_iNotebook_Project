let express = require("express");
let User = require("../models/User");
let router = express.Router();
const { body, validationResult } = require("express-validator");

//create a user using : POST '/api/auth' . Doesn't require Auth
router.post(
  "/",
  [
    body("email").isEmail(),
    body("name", "enter valid name").isLength({ min: 3 }),
    body("password", "enter a valid password of length more than 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors return that request and the request---
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user with the same email exitsts

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry user with this email already exists" });
      }
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({ error: "please enter a unique value for email" });
      // });
      res.json(user);
    } catch (error) {
      console.error(error.error);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
