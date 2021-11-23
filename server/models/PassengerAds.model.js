const { sequelize, Sequelize, users, addresses } = require(".");

module.exports = (sequelize, Sequelize) => {
    const PassengerAds = sequelize.define('PassengerAds', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        passengerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'passengerId'
        },
        country: {
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
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'startDate'
        },
        finishTime: {
            type: Sequelize.TIME,
            allowNull: false,
            field: 'finishTime'
        },
        seatsCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'seatsCount'
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'price'
        }
    }, {
        modelName: 'PassengerAds',
        tableName: 'PassengerAds',
        timestamps: false
    });

    return PassengerAds;
}