const { on } = require('nodemon');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const Ads = db.Ads;
const Users = db.Users;
const Orders = db.Orders;

exports.createOrder = async (req, res) => {
    const driverId = req.body.driverId;
    const passengerId = req.body.passengerId;
    const adId = req.body.adId;
    const seatsCount = req.body.seatsCount;
    const totalPrice = req.body.totalPrice;

    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    console.log("Driver id: " + driverId)
    console.log("Passenger id: " + passengerId)
    console.log("Ad id: " + adId)
    console.log("Seats count: " + seatsCount)
    console.log("Total price: " + totalPrice)

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
}

exports.getUserOrders = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log(`===== User Id For Orders: ${userId} =====`)

    try {
        await Orders
            .findAll(
                {
                    where: { passengerId: userId },
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

exports.getDriverOrders = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log(`===== User Id For Ads: ${userId} =====`)

    try {
        await Orders
            .findAll({
                include: [
                    { model: Users },
                    { model: Ads, where: { role: 'passenger', userId: userId } }
                ],
                raw: true
            }).then((orders) => {
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