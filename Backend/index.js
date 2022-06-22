let connecttomongo = require("./db");
const express = require("express");

connecttomongo();

const app = express();
const port = 3000;

app.use(express.json());  // bina is syntax k hm req.body (jo ki auth.js k andar hai) ko obtain nai kr skte 

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
