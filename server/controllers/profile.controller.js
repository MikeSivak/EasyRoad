const db = require('../models');
const users = db.users;
const cars = db.cars;
const ads = db.ads;
const travel_history = db.travel_history;

const bcrypt = require('bcryptjs');

users.hasMany(cars, {
    foreignKey: 'id_user',
    sourceKey: 'id'
});
cars.belongsTo(users, {
    foreignKey: 'id_user'
});

users.hasMany(ads, {
    foreignKey: 'id_user',
    sourceKey: 'id'
});
ads.belongsTo(users, {
    foreignKey: 'id_user'
});

users.hasMany(travel_history, {
    foreignKey: 'id_driver',
    sourceKey: 'id'
});
users.hasMany(travel_history, {
    foreignKey: 'id_passenger',
    sourceKey: 'id'
});
travel_history.belongsTo(users, {
    foreignKey: 'id_driver'
});
travel_history.belongsTo(users, {
    foreignKey: 'id_passenger'
});

exports.getProfileInfo = async (req, res) => {
    // const brands = await car_brand
    //     .findAll({ raw: true });

    // const users_list = await users
    // .findAll({
    //     include: [
    //         { model: roles }
    //     ],
    //     raw: true
    // });

    // const order_list = await current_orders
    // .findAll({
    //     include: [
    //         {model: users},
    //         {model: car, include: [{model: car_model, include: car_brand}]}
    //     ],
    //     raw:true
    // });

    try {
        await users //добавить в секцию include необходимые таблицы
            .findOne({
                include: [
                    // { model: roles },
                    { model: cars },
                    { model: ads },
                    { model: travel_history }
                    //for example:
                    //// { model: car_model, include: car_brand },
                    //// { model: car_model, include: [{ model: car_brand, include: car_country }] },
                ],
                raw: true
            },
                {
                    where: {
                        id: 1
                    }
                },
            ).then(user => {
                res.send('Личный профиль\n' +
                    ' User: ' + user)
                // res.render('admin', {
                //     cars: cars,
                //     brands: brands,
                //     models: models,
                //     bodies: bodies,
                //     fuels: fuels,
                //     drives: drives,
                //     cylinders: cylinders,
                //     engine_types: engine_types,
                //     engine_volumes: engine_volumes,
                //     fuel_indices: fuel_indices,
                //     users_list: users_list,
                //     order_list: order_list
                // });
                // console.log(cars);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

// exports.updateProfileInfo = async(req,res)=>{
//     let id = req.body.id;
//     let user_email = req.body.user_email;
//     // let user_password = req.body.user_password;
//     let user_number = req.body.user_number;
//     let us_name = req.body.us_name;
//     let gender = req.body.gender;

//     //get all parameters
//     try{
//         await users
//         .update({
//             user_email: user_email,
//             // user_password: user_password,
//             user_number: user_number,
//             us_name: us_name,
//             gender: gender
//         },
//         {
//             where:{
//                 id:id
//             }
//         })
//         .then(
//             res.send('(' + id + ')' + ' profile updated')
//         )
//     }
//     catch (e) {
//         res.status(500).json({
//             message: 'Something went wrong, try again: ' + e.message
//         })
//     }
// }

exports.updateProfileInfo = async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const number = req.body.number;
    const name = req.body.name;
    const gender = req.body.gender;

    if (!email || !password || !number) {
        res.send('Заполните все поля!')
    }
    else if(password.length < 4){
        res.send('Пароль должен иметь не менее 4 символов!');
    }
    else {
        let updateUser = new users({
            user_email: email,
            user_number: number,
            us_name: name,
            gender: gender,
            user_password: password,
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(updateUser.user_password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                console.log("HASH: " + hash);
                updateUser.user_password = hash;

                users
                .update({
                    user_email: updateUser.user_email,
                    user_password: updateUser.user_password,
                    user_number: updateUser.user_number,
                    us_name: updateUser.us_name,
                    gender: updateUser.gender
                },
                    {
                        where: {
                            id: id
                        }
                    })
                .then(
                    res.send('(' + id + ')' + ' profile updated')
                )
            });
        });
        
        // try {
        //     await users
        //         .update({
        //             user_email: updateUser.user_email,
        //             user_password: updateUser.user_password,
        //             user_number: updateUser.user_number,
        //             us_name: updateUser.us_name,
        //             gender: updateUser.gender
        //         },
        //             {
        //                 where: {
        //                     id: id
        //                 }
        //             })
        //         .then(
        //             res.send('(' + id + ')' + ' profile updated')
        //         )
        // }
        // catch (e) {
        //     res.status(500).json({
        //         message: 'Something went wrong, try again: ' + e.message
        //     })
        // }
    }
}