const { countries } = require('.');

module.exports = (sequelize, Sequelize) => {
    const Cities = sequelize.define('Cities', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        countryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: countries,
            referencesKey: 'id',
            field: 'countryId'
        },
        cityName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'cityName'
        }
    }, {
        modelName: 'Cities',
        tableName: 'Cities',
        timestamps: false
    });

    return Cities;
}