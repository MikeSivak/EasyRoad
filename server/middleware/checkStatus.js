const db = require('../models')
const User = db.Users;

exports.checkStatus = (req, res, next) => {
    User.findByPk(req.userId)
    .then(user => {
      if(user.userStatus == 1){
        console.log("User Status: " + user.userStatus + " - You have access to application :)");
        next();
      }
      else{
        console.log("User Status: " + user.userStatus + " - You have not access to application :(");
        res.status(403).send("Ваш профиль был заблокирован!");
      }
    });
  return;
}