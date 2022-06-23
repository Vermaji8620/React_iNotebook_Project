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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "please enter a unique value for email" });
      });
  }
);

module.exports = router;
