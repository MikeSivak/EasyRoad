const {Router} = require('express');
const profile_controller = require('../controllers/profile.controller.js');
const authJwt = require('../middleware/authJwt.js');
const profile_router = Router();

profile_router.get('/', [authJwt.verifyToken], profile_controller.getProfileInfo);
profile_router.get('/cars', [authJwt.verifyToken], profile_controller.getCars);
profile_router.post('/update', profile_controller.updateProfileInfo);
profile_router.post('/addCar', [authJwt.verifyToken], profile_controller.addCar);
profile_router.delete('/car/:id', [authJwt.verifyToken], profile_controller.deleteCar)

module.exports = profile_router;