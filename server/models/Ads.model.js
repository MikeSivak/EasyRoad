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
            field: 'userId',
            onDelete: 'CASCADE'
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
            field: 'carId'
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
            type: Sequelize.DATEONLY,
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
    });

    return Ads;
}