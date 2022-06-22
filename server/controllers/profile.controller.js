const db = require('../models');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Users = db.Users;
const Cars = db.Cars;
const Ads = db.Ads;
const Roles = db.Roles;
const TravelHistory = db.TravelHistory;
const Orders = db.Orders;

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

exports.updateCar = async (req, res) => {
    const carId = req.params.id;
    const carBrand = req.body.carBrand;
    const carModel = req.body.carModel;
    const carNumber = req.body.carNumber;
    const carPhoto = req.body.carPhotoLink;

    let updateData = {
        carBrand: carBrand,
        carModel: carModel,
        carNumber: carNumber,
        carPhotoLink: carPhoto,
    }

    Object.keys(updateData).map((key, index) => {
        if(!updateData[key]) {delete updateData[key]}
    })

    await Cars
        .update(
            updateData,
            {
                where: { id: carId }
            }
        )
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
    const userId = req.body.userId;
    const userEmail = req.body.userEmail;
    const userPhone = req.body.number;
    const userName = req.body.name;
    const userGender = req.body.gender;

    const user = await Users.findOne({
        where: {
            id: userId
        }
    })

    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }

    await Users.update({
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        gender: userGender,
    }, {
        where: {
            id: userId
        }
    })
        .then((user) => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.changePassword = async (req, res) => {
    const userId = req.body.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!oldPassword || !newPassword) {
        res.send('Заполните все поля!')
    }

    if (oldPassword.length < 4 || newPassword.length < 4) {
        res.send('Пароль должен иметь не менее 4 символов!');
    }

    const user = await Users.findOne({
        where: {
            id: userId
        }
    })

    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
        oldPassword,
        user.userPassword
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    await Users.update({
        userPassword: bcrypt.hashSync(newPassword, 8)
    }, {
        where: {
            id: userId
        }
    })
        .then((user) => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.deleteProfile = async (req, res) => {
    let id = req.params.id;

    try {
        Users
            .destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            .then(() => {
                res.status(202).json({ message: 'user deleted successfully!' });
            })
    }
    catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}