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
    const userId = req.userId;
    console.log('USER ID: ' + userId);

    try {
        await Users //добавить в секцию include необходимые таблицы
            .findOne(
                {
                    where: {
                        id: userId,
                    }
                },
            ).then(user => {
                res.status(200).send(user)
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

// exports.updateProfileInfo = async(req,res)=>{
//     let id = req.body.id;
//     let user_email = req.body.user_email;
//     // let user_password = req.body.user_password;
//     let user_number = req.body.user_number;
//     let us_name = req.body.us_name;
//     let gender = req.body.gender;

//     //get all parameters
//     try{
//         await users
//         .update({
//             user_email: user_email,
//             // user_password: user_password,
//             user_number: user_number,
//             us_name: us_name,
//             gender: gender
//         },
//         {
//             where:{
//                 id:id
//             }
//         })
//         .then(
//             res.send('(' + id + ')' + ' profile updated')
//         )
//     }
//     catch (e) {
//         res.status(500).json({
//             message: 'Something went wrong, try again: ' + e.message
//         })
//     }
// }

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

                users
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

        // try {
        //     await users
        //         .update({
        //             user_email: updateUser.user_email,
        //             user_password: updateUser.user_password,
        //             user_number: updateUser.user_number,
        //             us_name: updateUser.us_name,
        //             gender: updateUser.gender
        //         },
        //             {
        //                 where: {
        //                     id: id
        //                 }
        //             })
        //         .then(
        //             res.send('(' + id + ')' + ' profile updated')
        //         )
        // }
        // catch (e) {
        //     res.status(500).json({
        //         message: 'Something went wrong, try again: ' + e.message
        //     })
        // }
    }
}