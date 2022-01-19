const db = require("../models");
const config = require("../config/auth.config");
const User = db.Users;
const Role = db.Roles;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Cars } = require("../models");

exports.signup = (req, res) => {
  const userName = req.body.userName;
  const userPhone = req.body.userPhone;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const gender = req.body.gender;

  console.log(`name: ${userName} \n
    phone: ${userPhone} \n
    email: ${userEmail} \n
    password: ${userPassword} \n
    gender: ${gender} \n`)

  // Save User to Database
  User.create({
    userName: userName,
    userPhone: userPhone,
    userEmail: userEmail,
    userPassword: bcrypt.hashSync(userPassword, 8),
    roleId: 2, //user
    gender: gender,
    userStatus: 1,
  })
    .then(() => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword
  User.findOne({
    where: {
      userEmail: userEmail
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        userPassword,
        user.userPassword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      const cars = await Cars
        .findAll({ where: { userId: user.id }, raw: true })

      res.status(200).send({
        id: user.id,
        role: user.roleId,
        username: user.userName,
        email: user.userEmail,
        userPhoto: user.userPhoto,
        accessToken: token,
        cars: cars
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};