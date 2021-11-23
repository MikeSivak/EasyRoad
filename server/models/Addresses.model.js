const { sequelize, Sequelize, cities } = require(".");

module.exports = (sequelize, Sequelize) =>{
    const Addresses = sequelize.define('Addresses', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field:'id'
        },
        cityId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: cities,
            referencesKey: 'id',
            field: 'cityId'
        },
        address:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'address'
        }
    }, {
        modelName:'Addresses',
        tableName: 'Addresses',
        timestamps: false
    });

    return Addresses;
}