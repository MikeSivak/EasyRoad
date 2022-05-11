const express = require('express');
const app = express();
const db = require('./models');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcryptjs");
const { nextTick } = require('process');
const cors = require("cors");
const { authJwt } = require("./middleware");
const { checkStatus } = require("./middleware/checkStatus")
// const controller = require("./controllers/user.controller");
const adsRoutes = require('./routes/ads.routes');
const ordersRoutes = require('./routes/orders.routes');
const profileRoutes = require('./routes/profile.routes');
const multer = require('multer');
const Role = db.Roles;
const Users = db.Users;
const PORT = process.env.PORT || 3001;

// parse application/json
app.use(cors())
app.use(bodyParser.json())
app.use(express.json({
    extended: true
}));
app.use(express.urlencoded());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

require('./routes/auth.routes')(app);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.sendStatus(500);
        }
        const userId = req.headers['x-user-id'];
        console.log("userID: " + userId)
        updatePhoto(userId, req.file.filename);
        res.send(req.file);
    });
});

app.post('/uploadcarphoto', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send(req.file);
    });
});

function updatePhoto(userId, userPhoto) {
    console.log("user ID: " + userId)
    console.log("user Photo: " + userPhoto)
    Users
        .update({ userPhoto: userPhoto }, {
            where: {
                id: userId
            }
        });
}

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    require('./routes/admin.routes')
);
app.use('/ads', [authJwt.verifyToken], [checkStatus], adsRoutes);
app.use('/orders', [authJwt.verifyToken], [checkStatus], ordersRoutes)
app.use('/profile', [authJwt.verifyToken], [checkStatus], profileRoutes);

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

db.sequelize.sync();

async function initial() {
    await Role.create({
        id: 1,
        roleName: "admin"
    })
        .then(() => {
            console.log("Admin role inserted successfully!")
        })
        .catch((err) => {
            console.log("Role is not inserted: -- error -- " + err);
        })
    await Role.create({
        id: 2,
        roleName: "user"
    })
        .then(() => {
            console.log("Users role inserted successfully!")
        })
        .catch((err) => {
            console.log("Role is not inserted: -- error -- " + err);
        })

    //Create admin
    await Users.create({
        userName: 'Mike',
        userPhone: '+375297314004',
        userEmail: 'noizemcnorm@gmail.com',
        userPassword: bcrypt.hashSync('1999', 8),
        roleId: 1, //admin
        gender: 'male',
        userStatus: 1,
    })
        .then(() => {
            console.log("Admin was registered successfully!");
        })
        .catch(err => {
            console.log("message:" + err.message);
        });

    //Create user
    await Users.create({
        userName: 'Test User',
        userPhone: '+375291452255',
        userEmail: 'test@gmail.com',
        userPassword: bcrypt.hashSync('test', 8),
        roleId: 2, //user
        gender: 'male',
        userStatus: 1,
    })
        .then(() => {
            console.log("User was registered successfully!");
        })
        .catch(err => {
            console.log("message:" + err.message);
        });
}

app.get('/', (req, res) => {
    res.json({ message: 'Home page' })
});

app.listen(PORT);
console.log(`server was started on port: ${PORT} ...`);