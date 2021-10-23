const db = require('../models');
const users = db.users;
const cities = db.cities;

module.exports = (sequelize, Sequelize) =>{
    const travel_history = sequelize.define('travel_history', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_driver: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'id_driver'
        },
        id_passenger: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'id_passenger'
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
        travel_date: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'travel_date'
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'price'
        },
        distance:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'distance'
        }
    },{
        modelName: 'travel_history',
        tableName: 'travel_history',
        timestamps: false
    });
    
    return travel_history;
}