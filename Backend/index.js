let connecttomongo = require("./db");
const express = require("express");

connecttomongo();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello vermaji!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
