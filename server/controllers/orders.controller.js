const { on } = require('nodemon');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const Ads = db.Ads;
const Users = db.Users;
const Orders = db.Orders;
const Reviews = db.Reviews;

exports.createReview = async (req, res) => {
    const driverId = req.body.driverId;
    const passengerId = req.body.passengerId;
    const rate = req.body.rate;
    const comment = req.body.comment;

    console.log("CHECK")
    console.log("Driver id: " + driverId)
    console.log("Passenger id: " + passengerId)
    console.log("Rate: " + rate)
    console.log("Comment: " + comment)

    const user = await Users
        .findOne(
            {
                where: {
                    id: driverId
                }
            }
        )

    let userRate = user.rate
        ? ((rate + user.rate) / 2).toFixed(2)
        : rate

    try {
        Reviews
            .create({
                driverId: driverId,
                passengerId: passengerId,
                rate: rate,
                comment: comment,
            })
            .then(
                res.send("Review created successfully!")
            )
            .catch((err) => {
                console.log("Ошибка создания отзыва: " + err.message)
            })

        await Users
            .update({
                rate: userRate
            },
                {
                    where: {
                        id: driverId
                    }
                })
            .then(
                res.send('(' + id + ')' + ' profile updated')
            )
    } catch (e) {
        console.log('5555555555555555555555555555555555555555')
        console.log(e.message)
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.createOrder = async (req, res) => {
    const driverId = req.body.driverId;
    const passengerId = req.body.passengerId;
    const adId = req.body.adId;
    const seatsCount = req.body.seatsCount;
    const totalPrice = req.body.totalPrice;
    let seatsAvailable = req.body.seatsAvailable;

    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    console.log("Driver id: " + driverId)
    console.log("Passenger id: " + passengerId)
    console.log("Ad id: " + adId)
    console.log("Seats count: " + seatsCount)
    console.log("Total price: " + totalPrice)
    seatsAvailable -= seatsCount;
    console.log('AVAILABLE SEATS: ' + seatsAvailable)

    try {
        Orders
            .create({
                driverId: driverId,
                passengerId: passengerId,
                adId: adId,
                seatsCount: seatsCount,
                totalPrice: totalPrice
            })
            .then(
                res.send("Order created successfully!")
            )
            .catch((err) => {
                console.log("Ошибка создания заказа: " + err.message)
            })
    } catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }

    try {
        Ads
            .update({
                seatsCount: seatsAvailable
            }, {
                where: {
                    id: adId
                }
            })
            .then((res) => {
                res.status(202).send(res);
            })
            .catch((err) => {
                throw err.message
            })
    }
    catch (err) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.getUserOrders = async (req, res) => {
    const userId = req.headers['x-user-id'];
    const roleOrder = req.params.roleOrder;

    console.log(`===== User Id For Orders: ${userId} =====`)

    if (roleOrder == 'driver') {
        console.log(`===== Order role: ${roleOrder} =====`)
        try {
            await Orders
                .findAll(
                    {
                        where: { driverId: userId },
                        include: [
                            {
                                model: Users,
                                as: 'PassengerId'
                            },
                        ],
                        raw: true,
                    }
                )
                .then((orders) => {
                    orders.forEach(
                        element =>
                            console.log(
                                element
                                // `id_user: ${element['id_user']} - for example
                            )
                    )
                    console.log("[[[[[[[[[[[ ORDERS ]]]]]]]]]]")
                    console.log(orders)
                    console.log('[[[[[[[[[[[[[[]]]]]]]]]]]]]')
                    res.send(orders)
                })
                .catch((err) => {
                    console.log("GET ORDERS ERROR: " + err.message)
                })
        }
        catch (e) {
            res.status(500).json({
                message: 'Something went wrong, try again: ' + e.message
            })
        }
    }
    else {
        console.log(`===== Order role: ${roleOrder} =====`)
        try {
            await Orders
                .findAll(
                    {
                        where: { passengerId: userId },
                        include: [
                            {
                                model: Users,
                                as: 'DriverId'
                            },
                        ],
                        raw: true,
                    }
                )
                .then((orders) => {
                    orders.forEach(
                        element =>
                            console.log(
                                element
                                // `id_user: ${element['id_user']} - for example
                            )
                    )
                    console.log("[[[[[[[[[[[ ORDERS ]]]]]]]]]]")
                    console.log(orders)
                    console.log('[[[[[[[[[[[[[[]]]]]]]]]]]]]')
                    res.send(orders)
                })
                .catch((err) => {
                    console.log("GET ORDERS ERROR: " + err.message)
                })
        }
        catch (e) {
            res.status(500).json({
                message: 'Something went wrong, try again: ' + e.message
            })
        }
    }
}

exports.getOrdersByAdId = async (req, res) => {
    const adId = req.params.id;
    await Orders.findAll({
        where: {
            adId: adId
        },
        include: [
            {
                model: Users,
                as: 'PassengerId'
            },
        ],
        raw: true,
    })
        .then((orders) => {
            res.send(orders)
        })
        .catch((err) => {
            res.status(500).send({ message: err.message })
        })
}

exports.getUserComments = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log(`@@@@@@@@@@@ User Id For COMMETS: ${userId} @@@@@@@@@@@`)

    try {
        await Reviews
            .findAll(
                {
                    where: { driverId: userId },
                    include: [
                        {
                            model: Users
                        },
                    ],
                    raw: true,
                }
            )
            .then((reviews) => {
                reviews.forEach(
                    element =>
                        console.log(
                            element
                            // `id_user: ${element['id_user']} - for example
                        )
                )
                console.log("@@@@@@@@@@ REVIEWS @@@@@@@@@@")
                console.log(reviews)
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                res.send(reviews)
            })
            .catch((err) => {
                console.log("GET REVIEWS ERROR: " + err.message)
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.deleteComment = (req, res) => {
    const commentId = req.params.id;

    try {
        Reviews
            .destroy({ where: { id: commentId } })
            .then(() => {
                res.status(202).json({ message: 'comment deleted successfully!' });
            })
            .catch((err) => {
                throw err.message;
            })
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}