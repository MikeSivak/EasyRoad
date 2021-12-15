const { Router } = require('express');
const ads_controller = require('../controllers/ads.controller.js');
const ads_router = Router();

ads_router.get('/', ads_controller.getAllAds);
ads_router.post('/searchAds', ads_controller.searchAds);
ads_router.get('/userAds', ads_controller.getUserAds);
ads_router.get('/countries', ads_controller.getCountries);
ads_router.get('/cities/:country', ads_controller.getCities);
ads_router.get('/allcities', ads_controller.getAllCities);
ads_router.get('/addresses/:city', ads_controller.getAddresses);
ads_router.get('/cars', ads_controller.getCars);
// ads_router.get('/openad', (req, res) => { res.render('ad') });
ads_router.post('/create', ads_controller.createAd);
ads_router.post('/update', ads_controller.updateAd);
ads_router.post('/delete', ads_controller.deleteAd);

module.exports = ads_router;