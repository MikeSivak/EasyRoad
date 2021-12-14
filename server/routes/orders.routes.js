const { Router } = require('express');
const orders_controller = require('../controllers/orders.controller.js');
const orders_router = Router();

orders_router.get('/getreviews', orders_controller.getUserComments);
orders_router.get('/:roleOrder', orders_controller.getUserOrders);
orders_router.post('/addreview', orders_controller.createReview);
orders_router.post('/create', orders_controller.createOrder);

module.exports = orders_router;