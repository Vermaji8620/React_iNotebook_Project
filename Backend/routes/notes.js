let express = require("express");
let router = express.Router();
// importing the fetchuser file in the middleware folder
let fetchuser = require("../middleware/fetchuser");
// importing the Notes file present in the models folder
let Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the Notes using : GET '/api/notes/getnotes'. login required--
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.error);
    res.status(500).send("internal server error");
  }
});

// ROUTE 2: Add a new Note using : POST '/api/notes/addnotes'. Login Required
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
      // below syntax means that, the credentials(title, description, tag acting as variables) that will be needed for adding a note will be extracted
      // i.e  the whole thing is that the title , description and tag that will be given as input will be stored in the 'title', 'decription' and 'tag' variable
      const { title, description, tag } = req.body;
      //if there are errors return that request and the request---
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // below syntax means that new Notes will be created---
      let notes = await new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // saves the inputted details into the database
      let savednote = await notes.save(); // saving the notes--
      res.json(savednote);
    } catch (error) {
      console.error(error.error);
      res.status(500).send("internal server error");
    }
  }
);

// ROUTE 3-- update an existing note using:
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  let { title, description, tag } = req.body;
  // create a new note object
  let newnote = {};
  if (title) {
    newnote.title = title;
  }

  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }
  // find the note to be updated (by its id )and then update it
  // niche wale line ka matlb hai ki koi agar aisa id marne ka kosis kr rha hai, jo ki hai hi nai, to 'not found' likhke aa jayega
  let note = await Notes.findById(req.params.id);
  if (!note) {
    res.status(404).send("not found");
  }

  // yaha pe check krrhe hai ki jo insan logged in hai notes ko update krne k liye, wo kahi dusra ka id leke notes ko modify krne ka to kosis nai na krrha hai---
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }

  // ab upar ka sab condition check ho gya hai aur ye final ho gya hai ki sb thik hai aur ab update krne ka kaam shuru hoga ---

  // when we perform update operation in mongoose ,it returns the previous state of the document (before it wass updated) and not the updated one. By setting 'new' to true in the third argument of the object in 'findByIdAndUpdate', we tell mongoose to return the updated state of the object instead of its default behaviour
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.json(note);
});

module.exports = router;
