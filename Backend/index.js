//yaha pe do kaam ho rha hai...----  1). database k sath jo v connection bana tha db.js me usko import kiya ja rha hai....---2)-- express.js use kiya ja rha hai jo ki hmko server se connect hone me help krta hai.Express.js me hm port assign kr skte hai..url-address assign kr skte hai...aur phir localhost pe hm wo port chala skte hai---nodemon ya (node.js) k help se (wo node.js jo k windows system me download krke install krna prta hai---)

let connecttomongo = require("./db");
const express = require("express");
var cors = require("cors"); //The CORS Policy Enables Cross-origin resource sharing (CORS) in Express Gateway. CORS defines a way in which a browser and server can interact and determine whether or not it is safe to allow a cross-origin request.

connecttomongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // bina is syntax k hm req.body (jo ki auth.js k andar hai) ko obtain nai kr skte

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNoteBook started listening on port ${port}`);
});
