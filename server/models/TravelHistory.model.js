const { Users, Cars, Addresses } = require('.');

module.exports = (sequelize, Sequelize) =>{
    const TravelHistory = sequelize.define('TravelHistory', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        // driverId get from orders table
        driverId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Users,
            referencesKey: 'id',
            field: 'driverId'
        },
        // passengerId get from orders table
        passengerId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Users,
            referencesKey: 'id',
            field:'passengerId'
        },
        // carId get from Ad (if ad was created by driver)
        carId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: Cars,
            referencesKey: 'id',
            field: 'carId'
        },
        // get from Ad
        startAddressId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Addresses,
            referencesKey: 'id',
            field: 'startAddressId',
        },
        finishAddressId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Addresses,
            referencesKey: 'id',
            field: 'finishAddressesId'
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'startDate'
        },
        startTime: {
            type: Sequelize.TIME,
            allowNull: true,
            field: 'startTime'
        },
        finishTime: {
            type: Sequelize.TIME,
            allowNull: false,
            field: 'finishTime'
        },
        // get from orders
        seatsCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'seatsCount'
        },
        // get from orders
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'totalPrice'
        },
    },{
        modelName: 'TravelHistory',
        tableName: 'TravelHistory',
        timestamps: false
    });
    
    return TravelHistory;
}