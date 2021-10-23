const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    // const config = require('../config/db.config')
const { check, validationResult } = require('express-validator')
const db = require('../models');
const User = db.users;

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User
            .findOne({ where: { id: req.user.id }, raw: true });
        // .select('-password')

        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('id');
    res.clearCookie('id_role');
    res.clearCookie('x-auth-token').redirect('/');
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login', [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists({ min: 4 })
    ],
    async(req, res, next) => {
        // validation
        console.log(req.body.email);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()})
            res.render('login');
        }
        console.log(req.body.email);

        const { email, password } = req.body

        try {
            // find user
            let user = await User.findOne({ where: { user_email: email }, raw: true });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] })
            }
            // compare passwords
            const isMatch = await bcrypt.compare(password, user.user_password)

            // invalid credentials
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const payload = {
                user: {
                    id: user.id,
                    id_role: user.id_role
                }
            }

            jwt.sign(
                payload, // user
                'tikudazvonish', // secret
                { // options
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) {
                        throw err
                    }
                    res.cookie('x-auth-token', token);
                    if (user.id_role == 1) {
                        console.log("URL before: " + req.body.prevURL);
                        res.redirect(req.body.prevURL);
                    }
                    if (user.id_role == 2) {
                        res.send('Hello user!');
                    } else {
                        res.render('home');
                    }
                }
            )
        } catch (err) {
            console.log("" + err.message)
            res.status(500).send('Server error')
        }
    }
)

module.exports = router