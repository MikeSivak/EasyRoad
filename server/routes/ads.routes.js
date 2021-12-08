const { Router } = require('express');
const ads_controller = require('../controllers/ads.controller.js');
const ads_router = Router();

ads_router.get('/newad',
    // auth,
    (req, res, next) => {
        const cookie = req.cookies;
        if (cookie['x-auth-token']) {
            next();
        } else {
            const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            const obj = {
                "fullUrl": fullUrl
            }
            res.render('login', {
                urlPath: obj,
            });
        }
    },
    (req, res) => {
        res.render('newAd')
    }
);

ads_router.get('/', ads_controller.getAllAds);
// ads_router.get('/openad', (req, res) => { res.render('ad') });
ads_router.post('/create', ads_controller.createAd);
ads_router.post('/update', ads_controller.updateAd);
ads_router.post('/delete', ads_controller.deleteAd);

module.exports = ads_router;