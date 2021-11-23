const { sequelize, Sequelize, users } = require(".");

module.exports = (sequelize, Sequelize) =>{
    const Orders = sequelize.define('Orders', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field:'id'
        },
        driverId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'driverId'
        },
        passengerId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field:'passengerId'
        },
        adId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            field: 'adId'
        }
    },{
        modelName: 'Orders',
        tableName: 'Orders',
        timestamps: false
    })
}