const {Router} = require('express');
const admin_controller = require('../controllers/admin.controller.js');
const admin_router = Router();
const ads_controller = require('../controllers/ads.controller.js');


//Completed
admin_router.get('/', admin_controller.getAdminProfile);
admin_router.get('/users', admin_controller.getAllUsers);
admin_router.post('/user/block', admin_controller.blockUser);
admin_router.post('/user/unblock', admin_controller.unblockUser);
admin_router.delete('/user/delete/:id', admin_controller.deleteUser);
admin_router.get('/ads', ads_controller.getAllAds);
admin_router.post('/ad/delete', admin_controller.deleteAd);
//Completed

//Need to update
admin_router.post('/ad/create', ads_controller.createAd);
admin_router.post('/update', admin_controller.updateAdminProfile);

module.exports = admin_router;