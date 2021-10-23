const db = require('../models');
const users = db.users;
const cities = db.cities;

module.exports = (sequelize, Sequelize) =>{
    const ads = sequelize.define('ads', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'id_user'
        },
        id_city: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: cities,
            referencesKey: 'id',
            field: 'id_city'
        },
        dep_address: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'dep_address'
        },
        arr_address: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'arr_address'
        },
        dep_date: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'dep_date'
        },
        dep_time: {
            type: Sequelize.TIME,
            allowNull: false,
            field: 'dep_time'
        },
        arr_time: {
            type: Sequelize.TIME,
            allowNull: false,
            field: 'arr_time'
        },
        seats_number:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'seats_number'
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'price'
        },
        radius: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'radius'
        },
        distance:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'distance'
        }
    },{
        modelName: 'ads',
        tableName: 'ads',
        timestamps: false
    });
    
    return ads;
}