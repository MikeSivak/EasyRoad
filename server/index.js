const express = require('express');
const app = express();
const db = require('./models');
db.sequelize.sync();
const auth = require('./middleware/auth');
const Handlebars = require('handlebars');

const path = require('path');
var exphbs = require('express-handlebars');
var hbs = require('hbs');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { nextTick } = require('process');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', exphbs({ extname: '.hbs' }));

app.set("view engine", "hbs");

app.set('views', path.join(__dirname, '/views'));
app.engine("hbs", exphbs({
    layoutsDir: "views/layouts",
    defaultLayout: "main",
    extname: "hbs"
}));

app.use(express.static('public'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

const port = 4000;
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

/**registration part */
app.use('/register', require('./routes/register.route.js'));
/**for users/admins*/
app.use('/ads', require('./routes/ads.route.js'));
/**for users */
app.use('/profile', require('./routes/profile.route.js'));
/**for admins */
app.use('/admin', require('./routes/admin.route.js'));

app.listen(port);
console.log(`server was started on port: ${port} ...`);