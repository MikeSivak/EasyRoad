const {Router} = require('express');
const register_controller = require('../controllers/register.controller.js');
const register_router = Router();

register_router.get('/', (req,res)=>{
    res.render('register');
})

register_router.post('/send', register_controller.register);

module.exports = register_router;
