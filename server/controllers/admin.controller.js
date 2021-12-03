const db = require('../models');
const Users = db.Users;
const Cars = db.Cars;
const Ads = db.Ads;
const TravelHistory = db.TravelHistory;
const Roles = db.Roles;
const Addresses = db.Addresses;
const Reviews = db.Reviews;

exports.getAdminProfile = async (req, res) => {
    try {
        await Users //добавить в секцию include необходимые таблицы
            .findOne({
                include: [
                    { model: Roles },
                    { model: Cars },
                    { model: Ads },
                    { model: TravelHistory }
                ],
                raw: true
            },
                {
                    where: {
                        roleId: 1
                    }
                },
            ).then(user => {
                res.send('Админ\n' +
                    'Имя: ' + user['userName'] +
                    '\nEmail: ' + user['userEmail'] +
                    '\nНомер: ' + user['userPhone'])
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.updateAdminProfile = async (req, res) => {
    let id = req.body.id;
    let user_email = req.body.user_email;
    // let user_password = req.body.user_password;
    let user_number = req.body.user_number;
    let us_name = req.body.us_name;
    let gender = req.body.gender;

    //get all parameters
    try {
        await users
            .update({
                user_email: user_email,
                // user_password: user_password,
                user_number: user_number,
                us_name: us_name,
                gender: gender,

            },
                {
                    where: {
                        id: id
                    }
                })
            .then(
                res.send('(' + id + ')' + ' profile updated')
            )
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getAllAds = async (req, res) => {
    try {
        await Ads
            .findAll({
                include: [
                    { model: Users },
                    { model: Addresses }
                ],
                raw: true
            }).then(ads => {
                ads.forEach(
                    element =>
                        console.log(
                            element
                            // `id_user: ${element['id_user']}
                            // us_name: ${element['user.us_name']}
                            // user_email: ${element['user.user_email']}
                            // user_number: ${element['user.user_number']}
                            // id_city: ${element['id_city']}
                            // city_name: ${element['city.city_name']}
                            // dep_address: ${element['dep_address']}
                            // arr_address: ${element['arr_address']}
                            // dep_date: ${element['dep_date']}
                            // dep_time: ${element['dep_time']}
                            // arr_time: ${element['arr_time']}
                            // seats_number: ${element['seats_number']}
                            // price: ${element['price']}
                            // radius: ${element['radius']}
                            // distance: ${element['distance']}`
                        )
                )
                res.send(ads)
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        await Users
            .findAll({
                include: [
                    { model: Roles },
                ],
                raw: true
            }).then(users => {
                users.forEach(
                    element =>
                        console.log(
                            element
                        )
                )
                res.send(users);
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.deleteAd = async (req, res) => {
    let id = req.body.id;

    try {
        Ads
            .destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            .then(
                res.send('(' + id + ')' + ' ad deleted')
            )
    }
    catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.blockUser = async (req, res) => {
    const id = req.body.id;
    try {
        await Users
            .update({
                userStatus: 2
            },
                {
                    where: {
                        id: id
                    }
                })
            .then(
                res.send('(' + id + ')' + ' user blocked')
            )
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.unblockUser = async (req, res) => {
    const id = req.body.id;
    try {
        await Users
            .update({
                userStatus: 1
            },
                {
                    where: {
                        id: id
                    }
                })
            .then(
                res.send('(' + id + ')' + ' user unblocked')
            )
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    let id = req.body.id;
    try {
        Users
            .destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            .then(
                res.send('(' + id + ')' + ' user deleted')
            )
    }
    catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}