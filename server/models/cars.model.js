const { users } = require('.');

module.exports = (sequelize, Sequelize) =>{
    const Cars = sequelize.define('Cars', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        carBrand: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'carBrand',
        },
        carModel: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'carModel'
        },
        fuelType: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'fuelType'
        },
        carPhotoLink:{
            type: Sequelize.STRING,
            allowNull: true,
            field: 'carPhotoLink'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'userId'
        },
        fuelConsumption:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'fuelConsumption'
        }
    },{
        modelName: 'Cars',
        tableName: 'Cars',
        timestamps: false
    });
    
    return Cars;
}