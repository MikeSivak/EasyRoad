const db = require('../models');
const users = db.users;
const cars = db.cars;
const ads = db.ads;
const travel_history = db.travel_history;
const roles = db.roles;
const cities = db.cities;
const countries = db.countries;
const reviews = db.reviews;

// roles.hasOne(users, {
//     foreignKey: 'id_role',
//     sourceKey: 'id'
// });
// users.belongsTo(roles, {
//     foreignKey: 'id_role'
// });

// users.hasMany(cars, {
//     foreignKey: 'id_user',
//     sourceKey: 'id'
// });
// cars.belongsTo(users, {
//     foreignKey: 'id_user'
// });

// users.hasMany(ads, {
//     foreignKey: 'id_user',
//     sourceKey: 'id'
// });
// ads.belongsTo(users, {
//     foreignKey: 'id_user'
// });

// countries.hasMany(cities, {
//     foreignKey: 'id_country',
//     sourceKey: 'id'
// });
// cities.belongsTo(countries, {
//     foreignKey:'id_country'
// })

// users.hasMany(reviews, {
//     foreignKey: 'id_user',
//     sourceKey: 'id'
// });
// reviews.belongsTo(users, {
//     foreignKey: 'id_user'
// })

// users.hasMany(travel_history, {
//     foreignKey: 'id_driver',
//     sourceKey: 'id'
// });
// users.hasMany(travel_history, {
//     foreignKey: 'id_passenger',
//     sourceKey: 'id'
// });
// travel_history.belongsTo(users, {
//     foreignKey: 'id_driver'
// });
// travel_history.belongsTo(users, {
//     foreignKey: 'id_passenger'
// });

exports.getAdminProfile = async (req, res) => {
    try {
        await users //добавить в секцию include необходимые таблицы
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
        await ads
            .findAll({
                include: [
                    { model: users },
                    { model: cities }
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
        await users
            .findAll({
                include: [
                    { model: roles },
                ],
                raw: true
            }).then(users => {
                users.forEach(
                    element =>
                    console.log(
                        element
                    )
                )
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.deleteAd = async (req,res) =>{
    let id_ad = req.body.id_ad;

    try{
        ads 
        .destroy(
            {
                where:{
                    id: id_ad
                }
            }
        )
        .then(
            res.send('(' + id_ad + ')' + ' ad deleted')
        )
    }
    catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.blockUser = async(req,res)=>{
    const id = req.body.id;
    try{
        await users
        .update({
            user_status: 2
        },
        {
            where:{
                id:id
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

exports.unblockUser = async(req,res)=>{
    const id = req.body.id;
    try{
        await users
        .update({
            user_status: 1
        },
        {
            where:{
                id:id
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

exports.deleteUser = async (req,res) =>{
    let id = req.body.id;
    try{
        users 
        .destroy(
            {
                where:{
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