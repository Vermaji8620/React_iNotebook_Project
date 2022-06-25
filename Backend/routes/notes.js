let express = require("express");
let router = express.Router();
// importing the fetchuser file in the middleware folder
let fetchuser = require("../middleware/fetchuser");
// importing the Notes file present in the models folder
let Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the Notes using : GET '/api/auth/getnotes'. login required--
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.error);
    res.status(500).send("internal server error");
  }
});

// ROUTE 2: Add a new Note using : POST '/api/auth/addnotes'. Login Required
router.post(
  "/addnotes",
  fetchuser,
  [
    // an array for the checking of the proper entry of the credentials(i.e its length, or displaying error message if credentials are not inputted correctly---)
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must atleast be 5 characters").isLength({
      min: 3,
    }),
  ],

  async (req, res) => {
    try {
      // below syntax means that, the credentials that will be needed for adding a note will be extracted
      const { title, description, tag } = req.body;
      //if there are errors return that request and the request---
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // below syntax means that these cresentials will be needed for adding a note 
      let notes = await new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      // saves the inputted details into the database
      let savednote = await notes.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.error);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
