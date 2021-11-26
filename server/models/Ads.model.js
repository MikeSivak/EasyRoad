const { sequelize, Sequelize, Users, Cars, Addresses } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Ads = sequelize.define('Ads', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Users,
            referencesKey: 'id',
            field: 'userId'
        },
        // for get list of ads by role (driver/passenger)
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'role'
        },
        carId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: Cars,
            referencesKey: 'id',
            field: 'carId'
        },
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
        // driver or passenger set seats count for trip
        seatsCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'seatsCount'
        },
        // driver or passenger set a price for trip
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'price'
        },
    }, {
        modelName: 'Ads',
        tableName: 'Ads',
        timestamps: false
    })
}