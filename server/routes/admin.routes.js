const {Router} = require('express');
const admin_controller = require('../controllers/admin.controller.js');
const admin_router = Router();

admin_router.get('/', admin_controller.getAdminProfile);
admin_router.post('/user/block', admin_controller.blockUser);       //change "/user/" in the future
admin_router.post('/user/unblock', admin_controller.unblockUser);   //change "/user/" in the future 
admin_router.post('/user/delete', admin_controller.deleteUser);   //change "/user/" in the future 
admin_router.post('/update', admin_controller.updateAdminProfile);
admin_router.get('/users', admin_controller.getAllUsers);
admin_router.get('/ads', admin_controller.getAllAds);
admin_router.post('/ad/delete', admin_controller.deleteAd);         //change "/ad/" in the future

module.exports = admin_router;