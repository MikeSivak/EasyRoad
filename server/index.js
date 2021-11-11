const express = require('express');
const app = express();
const db = require('./models');
db.sequelize.sync();
const auth = require('./middleware/auth');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { nextTick } = require('process');

const PORT = process.env.PORT || 3001;

app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json({
    extended: true
}));

app.use('/auth', require('./routes/auth.route'));

app.get('/', (req, res) => {
    res.render('home');
});

//password for admin: romanproject
app.get('/login', (req, res) => {
    const cookie = req.cookies;
    if (cookie['x-auth-token']) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

//test api
app.use('/test', (req,res)=>{
    res.json({ message: "Hello from server!" });
})

//  registration part
app.use('/register', require('./routes/register.route.js'));

//  for users/admins
app.use('/ads', require('./routes/ads.route.js'));

//  for users
app.use('/profile', require('./routes/profile.route.js'));

//  for admins
app.use('/admin', require('./routes/admin.route.js'));

app.listen(PORT);
console.log(`server was started on port: ${PORT} ...`);