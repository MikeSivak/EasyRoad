const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    // const gender = req.body.gender;
    const gender = 'male';

    if (!email || !password || !phone) {
        res.render('register', {
            title: 'Fill the all fields!'
        });
    } else {
        let newUser = new User({
            user_email: email,
            user_number: phone,
            id_role: 2,
            gender: gender,
            user_password: password,
        });
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.user_password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                }

                newUser.user_password = hash;
                User
                    .create({
                        user_email: newUser.user_email,
                        user_number: newUser.user_number,
                        id_role: newUser.id_role,
                        user_password: newUser.user_password,
                        gender: newUser.gender,
                        user_status: 1
                    })
                    .then(
                        res.redirect("/login"),
                    );
            });
        });
    }
}