const db = require('.');
const users = db.users;
const cities = db.cities;

module.exports = (sequelize, Sequelize) =>{
    const TravelHistory = sequelize.define('TravelHistory', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        driverId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'driverId'
        },
        passengerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'passengerId'
        },
        country:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'country'
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'city'
        },
        startAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'startAddress'
        },
        finishAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'finishAddress'
        },
        travelDate: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'travelDate'
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'price'
        }
    },{
        modelName: 'TravelHistory',
        tableName: 'TravelHistory',
        timestamps: false
    });
    
    return TravelHistory;
}