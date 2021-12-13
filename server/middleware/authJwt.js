const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.Users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => {
      if(user.roleId == 1){
        console.log("Admin: " + user.userName);
        next();
      }
      else{
        res.status(403).send("You have not access to admin");
      }
    });
  return;
};

isUser = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => {
      if(user.roleId == 2){
        console.log("User: " + user.userName);
        next();
      }
      else{
        res.send("You have not access!");
      }
    });
  return;
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser
};
module.exports = authJwt;