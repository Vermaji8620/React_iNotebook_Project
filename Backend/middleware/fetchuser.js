const JWT_SECRET = "Adityaisagoodboy";
let jwt = require("jsonwebtoken");

let fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to req object
  let token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please autheneicate using  valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET); //for verification, token is needed (that was generated earlier) and then the signature is needed---
    req.user = data.user;
    next(); // command for running the next function
  } catch {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
};

module.exports = fetchuser;
