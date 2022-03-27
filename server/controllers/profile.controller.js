const db = require('../models');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Users = db.Users;
const Cars = db.Cars;
const Ads = db.Ads;
const Roles = db.Roles;
const TravelHistory = db.TravelHistory;

const bcrypt = require('bcryptjs');

exports.getProfileInfo = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log('USER ID: ' + userId);

    try {
        const userCar = await
            Cars
                .findAll({
                    where: { userId: userId }
                })

        await Users
            .findOne(
                {
                    where: {
                        id: userId,
                    }
                },
            ).then(user => {
                res.status(200).send(
                    {
                        data:
                        {
                            user: user,
                            cars: userCar
                        }
                    }
                )
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.deleteCar = async (req, res) => {
    const carId = req.params.id;
    await Cars.destroy({ where: { id: carId } })
        .then(() => {
            res.status(202).send("Car successfully deleted :)")
        })
        .catch((err) => {
            throw err.message
        })
}

exports.getCars = async (req, res) => {
    const userId = req.headers['x-user-id']
    await Cars
        .findAll({
            where: { userId: userId }
        })
        .then((cars) => {
            res.status(200).send(cars)
        })
        .catch((err) => {
            throw err.message
        })
}

exports.addCar = async (req, res) => {
    const userId = req.body.userId;
    const carBrand = req.body.carBrand;
    const carModel = req.body.carModel;
    const carNumber = req.body.carNumber;
    const carPhoto = req.body.carPhotoLink

    await Cars
        .create({
            carBrand: carBrand,
            carModel: carModel,
            carNumber: carNumber,
            carPhotoLink: carPhoto,
            userId: userId
        })
        .then((car) => {
            res.send(car)
        })
        .catch((e) => {
            res.status(500).json({
                mesage: 'Something went wrong, try again: ' + e.mesage
            })
        })
}

exports.updateProfileInfo = async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const number = req.body.number;
    const name = req.body.name;
    const gender = req.body.gender;

    if (!email || !password || !number) {
        res.send('Заполните все поля!')
    }
    else if (password.length < 4) {
        res.send('Пароль должен иметь не менее 4 символов!');
    }
    else {
        let updateUser = new users({
            user_email: email,
            user_number: number,
            us_name: name,
            gender: gender,
            user_password: password,
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(updateUser.user_password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                console.log("HASH: " + hash);
                updateUser.user_password = hash;

                Users
                    .update({
                        user_email: updateUser.user_email,
                        user_password: updateUser.user_password,
                        user_number: updateUser.user_number,
                        us_name: updateUser.us_name,
                        gender: updateUser.gender
                    },
                        {
                            where: {
                                id: id
                            }
                        })
                    .then(
                        res.send('(' + id + ')' + ' profile updated')
                    )
            });
        });
    }
}