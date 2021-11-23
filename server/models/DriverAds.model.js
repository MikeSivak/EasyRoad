const { INTEGER } = require("sequelize/types");
const { sequelize, Sequelize, addresses } = require(".");

module.exports = (sequelize, Sequelize) => {
    const DriverAds = sequelize.define('DriverAds', {
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
        startTime: {
            type: Sequelize.TIME,
            allowNull: false,
            field: 'startTime'
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
        modelName: 'DriverAds',
        tableName: 'DriverAds',
        timestamps: false
    });

    return DriverAds;
}