const express = require('express');
const app = express();
const db = require('./models');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { nextTick } = require('process');
const Role = db.Roles;
const PORT = process.env.PORT || 3001;
app.use(express.json({
    extended: true
}));
app.use(express.urlencoded());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//         initial();
// });

db.sequelize.sync();

async function initial() {
    await Role.create({
        id: 1,
        roleName: "admin"
    })
    .then(()=>{
        console.log("Role inserted successfully!")
    })
    .catch((err)=>{
        console.log("Role is not inserted: -- error -- " + err);
    })
    await Role.create({
        id: 2,
        roleName: "user"
    })
    .then(()=>{
        console.log("Role inserted successfully!")
    })
    .catch((err)=>{
        console.log("Role is not inserted: -- error -- " + err);
    })
}

app.get('/', (req, res) => {
    res.json({message: 'Home page'})
});

//test api
app.use('/test', (req, res) => {
    res.json({ message: "Hello from server!" });
})

//  for users/admins
// app.use('/ads', require('./routes/ads.route.js'));

//  for users
// app.use('/profile', require('./routes/profile.route.js'));

//  for admins
// app.use('/admin', require('./routes/admin.route.js'));

app.listen(PORT);
console.log(`server was started on port: ${PORT} ...`);