const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) =>{
    const Addresses = sequelize.define('Addresses', {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false,
            field:'id'
        },
        country:{
            type:Sequelize.STRING,
            allowNull:false,
            field:'country'
        },
        city:{
            type:Sequelize.STRING,
            allowNull:false,
            field:'city'
        },
        street:{
            type:Sequelize.STRING,
            allowNull:false,
            field:'street'
        },
        streetNum:{
            type:Sequelize.STRING,
            allowNull:false,
            field:'streetNum'
        }
    },{
        modelName:'Addresses',
        tableName:'Addresses',
        timestamps:false
    });

    return Addresses;
}