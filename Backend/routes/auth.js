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
// importing the fetchuser file in the middleware folder
let fetchuser = require("../middleware/fetchuser");
// creating a signature for signing into the token
const JWT_SECRET = "Adityaisagoodboy";

//Route 1---create a user using : POST '/api/auth' . Doesn't require Authentication
router.post(
  "/createuser",
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

      //lets talk about tokens---

      // getting the token after signing in--- takes two inputs--first jis data(eg. k liye jo gurudwara me chappal dete hai, counter pe rakhna k liye , to usko data maan skte hai, jo ki is case me mere user k data ka 'id value' hai ) ka token banana hai, and second signature(jo number badge pe likha hota hai gurudware me) jo ki us data pe signed hoga, and then it returns the token to the person(gurudware me jo phir token mil jata hai)
      let authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
      // agar 'try' execute nai ho rha hai, to, 'catch' execute hoga
    } catch (error) {
      console.error(error.error);
      res.status(500).send("internal server error");
    }
  }
);

// Route 2---authenticating a user(creating a login)
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ], // mow sending request and responses
  async (req, res) => {
    const errors = validationResult(req);
    // identifying a bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // taking out the email and the password that is entered by the person trying to login
    const { email, password } = req.body;
    try {
      // finding the email from the list of the 'User' and storing that email in 'user'
      let user = await User.findOne({ email });
      // checking if the user (email entered by the person for logging in) is present or not
      if (!user) {
        return res
          .status(400)
          .json({ error: "please login using correct credentials" });
      }
      //now comporing the password
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ error: "please login using correct credentials" });
      }

      // passing the id(a particular thing of the user needs to be unique for getting signed) of the user into the data to get signed
      let data = {
        user: {
          id: user.id,
        },
      };
      // signing the data (i.e the id of the user....id is selected since it is a unique thing of any user--)..signing takes two thing..first- the information that needs to be signed and secondly the signature that willl be used to sign it ---
      let authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);

      //now if not able to fetch the data and do all the above things then go into 'catch'
    } catch (error) {
      console.error(error.error);
      res.status(500).send("internal server error");
    }
  }
);

// Route 3--- get logged in user details

router.post(
  // in this first is the api, then is the fetchuser function, and then is the followed function---
  "/getuser",
  fetchuser, // now sending request and responses
  async (req, res) => {
    try {
      userId = req.user.id; // req.user.id is obtained from fetchuser function--
      const user = await User.findById(userId).select("-password"); //  select everything other than password
      res.send(user);
    } catch (error) {
      console.error(error.error);
      res.status(500).send("internal server error");
    }
  }
);
module.exports = router;
