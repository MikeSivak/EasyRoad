const jwt = require('jsonwebtoken');
const config = require('../config/db.config');

module.exports = (req, res, next) => {
    // Get token from cookie
    const cookie = req.cookies;
    // Check if not token
    if (!cookie['x-auth-token']) {
        console.log('cookie: ' + JSON.stringify(cookie));
        console.log('token: ' + cookie['x-auth-token']);
        return res.redirect('/login');
    }
    // Verify token
    try {
        const decoded = jwt.verify(cookie['x-auth-token'], 'tikudazvonish');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};