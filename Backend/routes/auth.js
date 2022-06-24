// express helps in accessing the web server
let express = require("express");
// importing the User file in the models folder
let User = require("../models/User");
// helps in accessing the different API's
let router = express.Router();
// for validating(checking if same email is used for signups, checking if empty name is given while signing in, etc...) the inputs by the user for login
const { body, validationResult } = require("express-validator");
// for hashing(encrypting sort of) of the passwords inputted to a different form(i.e modifying of the password by the system as per the desire)
let bcrypt = require("bcryptjs");
// for returing token to the user who has inputted his details/credentials(full-form...---  Json Web Token)
var jwt = require("jsonwebtoken");

// creating a signature for signing into the token
const JWT_SECRET = "Adityaisagoodboy";

//create a user using : POST '/api/auth' . Doesn't require Auth
router.post(
  "/",
  [
    // an array for the checking of the proper entry of the credentials(i.e its length, or displaying error message if credentials are not inputted correctly---)
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
    
    try {
      //checking for an already existing email of the user-- --
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry user with this email already exists" });
      }

      //create a new user-- --
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        //below i have taken the input of the password and even encrypted it using bcrypt....gensalt and bcrypt both return promises and hence await is used...
        password: await bcrypt.hash(
          req.body.password,
          await bcrypt.genSalt(10)
        ),
      });
      let data = {
        user: {
          id: user.id,
        },
      };
      
      // getting the token after signing in--- takes two inputs--first jis data(eg. k liye jo gurudwara me chappal dete hai, counter pe rakhna k liye , to usko data maan skte hai, jo ki is case me mere user k data ka 'id value' hai ) ka token banana hai, and second signature(jo number badge pe likha hota hai gurudware me) jo ki us data pe signed hoga, and then it returns the token to the person(gurudware me jo phir token mil jata hai)
      let authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
    } // agar 'try' execute nai ho rha hai, to, 'catch' execute hoga 
    catch (error) {
      console.error(error.error);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
