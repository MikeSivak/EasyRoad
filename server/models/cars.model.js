const { users } = require('../models');

module.exports = (sequelize, Sequelize) =>{
    const cars = sequelize.define('cars', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        car_brand: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'car_brand',
        },
        car_model: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'car_model'
        },
        fuel_type: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'fuel_type'
        },
        car_photo_link:{
            type: Sequelize.STRING,
            allowNull: true,
            field: 'car_photo_link'
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'id_user'
        },
        fuel_consumption:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'fuel_consumption'
        }
    },{
        modelName: 'cars',
        tableName: 'cars',
        timestamps: false
    });
    
    return cars;
}