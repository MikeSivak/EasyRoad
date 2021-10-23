const db = require('../models');
const ads = db.ads;
const users = db.users;
const cities = db.cities;

cities.hasMany(ads, {
    foreignKey: 'id_city',
    sourceKey: 'id'
});
ads.belongsTo(cities, {
    foreignKey: 'id_city'
});

users.hasMany(ads, {
    foreignKey: 'id_user',
    sourceKey: 'id'
});
ads.belongsTo(users, {
    foreignKey: 'id_user'
});

exports.createAd = async(req, res) => {
    // const id_car = req.body.id_car;
    // const id_user = req.user.id;
    // const id_city = req.body.id_city;
    try {
        ads
            .create({
                id_user: 1, //id_user,   
                id_city: 1, //id_city,               //get id_city from cites table before this
                dep_address: "A", //dep_address,       //enter from keybord
                arr_address: "B", //arr_address,       //enter from keybord
                dep_date: "2021-01-07", //dep_date,             //chose date from select field
                dep_time: "12:00:00", //dep_time,             //chose date from select field
                arr_time: "13:00:00", //arr_time,             //chose date from select field
                seats_number: 2, //seats_number,     //enter from keybord
                price: 12, //price,                   //enter from keybord
                radius: 200, //radius,                 //future feauture
                distance: 10000 //distance              //calculate from km. and 
            })
            .then(
                // res.redirect('http://localhost:5000/content')
                // res.render('adsList')
                res.redirect('/ads/adsList')
            );
    } catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.deleteAd = async(req, res) => {
    let id_ad = req.body.id_ad;

    try {
        ads
            .destroy({
                where: {
                    id: id_ad
                }
            })
            .then(
                res.send('(' + id_ad + ')' + ' ad deleted')
            )
    } catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.updateAd = async(req, res) => {
    let id = req.body.id;
    let city_name = req.body.city_name;
    let dep_address = req.body.dep_address;
    let arr_address = req.body.arr_address;
    let dep_date = req.body.dep_date;
    // let dep_time = req.body.dep_time;
    // let arr_time = req.body.arr_time;
    let seats_number = req.body.arr_time;
    let price = req.body.price;
    let radius = req.body.radius;
    let distance = req.body.distance;

    const city = await cities
        .findOne({ where: { city_name: city_name }, raw: true });
    id_city = city.id;

    // console.log('ID_CITY: ', id_city);
    // console.log('DEP_TIME: ', dep_time);
    // console.log('ARR_TIME: ', arr_time);

    try {
        ads
            .update({
                id_city: id_city,
                dep_address: dep_address,
                arr_address: arr_address,
                dep_date: dep_date,
                dep_time: "00:00:00", //dep_time,
                arr_time: "23:59:59", //arr_time,
                seats_number: seats_number,
                price: price,
                radius: radius,
                distance: distance
            }, {
                where: {
                    id: id
                }
            })
            .then(
                res.send('(' + id + ')' + ' ad updated')
            )
    } catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}