const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const Ads = db.Ads;
const Users = db.Users;
const Addresses = db.Addresses;
const Cars = db.Cars;

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

exports.getAllCities = async (req, res) => {
    try {
        Addresses
            .findAll({ attributes: ['city'], group: ['city'] })
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
            .findAll({ attributes: ['street', 'streetNum'], group: ['street', 'streetNum'], where: { city: city } })
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

exports.getCars = async (req, res) => {
    const userId = req.headers['x-user-id'];
    try {
        Cars
            .findAll({ where: { userId: userId } })
            .then((cars) => {
                console.log(cars);
                res.send(cars);
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
                ],
                raw: true
            }).then((ads) => {
                ads.forEach(
                    element =>
                        console.log(
                            element
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

exports.searchAds = async (req, res) => {
    const city = req.body.city;
    const startAddress = req.body.startAddress;
    const finishAddress = req.body.finishAddress;
    const startDate = req.body.startDate;

    console.log("======= PARMS =========")
    console.log("City: " + city)
    console.log('Start Date: ' + startDate)
    console.log('Start Address: ' + startAddress)
    console.log('Finish Address: ' + finishAddress)
    console.log("=======================")

    let startD = startDate
    let endD = startDate;

    if (startDate == '1970-01-01') {
        startD = '1970-01-01';
        endD = '2100-12-31';
    }



    try {
        await Ads
            .findAll(
                {
                    where: {
                        [Op.or]: [{
                            city: {
                                [Op.like]: `%${city}%`,
                            },
                            startAddress: {
                                [Op.like]: `%${startAddress}%`,
                            },
                            finishAddress: {
                                [Op.like]: `%${finishAddress}%`,
                            },
                            startDate: {
                                [Op.between]: [startD, endD],
                            }
                            // startDate: startDate
                        }]
                    },
                    include: [
                        { model: Users },
                    ],
                    raw: true
                }).then((ads) => {
                    console.log('==== SEARCH RESULT ====')
                    ads.forEach(
                        element =>
                            console.log(
                                element
                            )
                    )
                    console.log("LENGTH: " + ads.length)
                    console.log('==== SEARCH RESULT END ====')
                    res.send(ads)
                })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getUserAds = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log(`===== User Id For Ads: ${userId} =====`)

    try {
        await Ads
            .findAll({
                include: [
                    { model: Users, where: { id: userId } },
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
                // console.log("[[[[[[[[[[[ DATA ]]]]]]]]]]")
                // console.log(ads)
                // console.log('[[[[[[[[[[[[[[]]]]]]]]]]]]]')
                res.send(ads)
            })
            .catch((err) => {
                console.log("GET ADS ERROR: " + err.message)
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