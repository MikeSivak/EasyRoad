const {Router} = require('express');
const profile_controller = require('../controllers/profile.controller.js');
const authJwt = require('../middleware/authJwt.js');
const profile_router = Router();

// profile_router.get('/admin', profile_controller.getAdminProfile);
profile_router.get('/', [authJwt.verifyToken], profile_controller.getProfileInfo);
profile_router.post('/update', profile_controller.updateProfileInfo);

module.exports = profile_router;