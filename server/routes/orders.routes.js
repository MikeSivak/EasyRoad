const { Router } = require('express');
const orders_controller = require('../controllers/orders.controller.js');
const orders_router = Router();

orders_router.get('/getreviews', orders_controller.getUserComments);
orders_router.get('/:roleOrder', orders_controller.getUserOrders);
orders_router.get('/ordersByAd/:id', orders_controller.getOrdersByAdId)
orders_router.post('/addreview', orders_controller.createReview);
orders_router.post('/create', orders_controller.createOrder);
orders_router.delete('/cancel/:id', orders_controller.cancelOrder);
orders_router.delete('/accept/:id', orders_controller.acceptOrder);
orders_router.delete('/comment/:id', orders_controller.deleteComment);

module.exports = orders_router;