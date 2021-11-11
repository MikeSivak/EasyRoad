const { countries } = require('../models');

module.exports = (sequelize, Sequelize) => {
    const cities = sequelize.define('cities', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_country: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: countries,
            referencesKey: 'id',
            field: 'id_country'
        },
        city_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'city_name'
        }
    }, {
        modelName: 'cities',
        tableName: 'cities',
        timestamps: false
    });

    return cities;
}