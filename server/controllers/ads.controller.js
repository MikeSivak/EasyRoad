const db = require('../models');
const Ads = db.Ads;
const Users = db.Users;
const Addresses = db.Addresses;

// cities.hasMany(ads, {
//     foreignKey: 'id_city',
//     sourceKey: 'id'
// });
// ads.belongsTo(cities, {
//     foreignKey: 'id_city'
// });

// users.hasMany(ads, {
//     foreignKey: 'id_user',
//     sourceKey: 'id'
// });
// ads.belongsTo(users, {
//     foreignKey: 'id_user'
// });

exports.getCountries = async (req, res) => {
    try {
        Addresses
            .findAll({ attributes: ['country'], group: ['country'] })
            .then((countries) => {
                console.log('_____________________')
                console.log(countries);
                res.send(countries)
            })
            .catch((e) => {
                console.log(e);
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getCities = async (req, res) => {
    const country = req.params.country;
    try {
        Addresses
            .findAll({ attributes: ['city'], group: ['city'], where: { country: country } })
            .then((cities) => {
                console.log(cities);
                res.send(cities)
            })
            .catch((e) => {
                console.log(e);
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getAddresses = async (req, res) => {
    const city = req.params.city;
    try {
        Addresses
            .findAll({ attributes: ['street', 'streetNum'], where: {city: city} })
            .then((addresses) => {
                console.log(addresses);
                res.send(addresses);
            })
            .catch((e) => {
                console.log(e);
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getAllAds = async (req, res) => {
    try {

        await Addresses.findAll().then((address) => {
            console.log("{{{{{{{{{{{{{---- ADDRESSES ----}}}}}}}}}}}}}}")
            console.log(address);
            console.log("{{{{{{{{{{{{{---- End ----}}}}}}}}}}}}}}")
        })
        await Ads
            .findAll({
                include: [
                    { model: Users },
                    // { model: Addresses }    
                ],
                raw: true
            }).then((ads) => {
                ads.forEach(
                    element =>
                        console.log(
                            element
                            // `id_user: ${element['id_user']} - for example
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

exports.createAd = async (req, res) => {

    const userId = req.body.userId;
    const role = req.body.role;
    const carId = req.body.carId;
    const country = req.body.country;
    const city = req.body.city;
    const startAddress = req.body.startAddress;
    const finishAddress = req.body.finishAddress;
    const startDate = req.body.startDate;
    const startTime = req.body.startTime;
    const finishTime = req.body.finishTime;
    const seatsCount = req.body.seatsCount;
    const price = req.body.price;


    try {
        Ads
            .create({
                userId: userId, //id_user,  
                role: role,
                carId: carId,
                country: country,
                city: city,
                startAddress: startAddress,
                finishAddress: finishAddress,
                startDate: startDate,
                startTime: startTime,
                finishTime: finishTime,
                seatsCount: seatsCount,
                price: price
            })
            .then(
                // res.redirect('http://localhost:5000/content')
                // res.render('adsList')
                // res.redirect('/ads/adsList')
                res.send("Ad created successfully!")
            );
    } catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.deleteAd = async (req, res) => {
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

exports.updateAd = async (req, res) => {
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