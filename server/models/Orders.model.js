const { sequelize, Sequelize, Users, Ads } = require(".");

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
            references: Users,
            referencesKey: 'id',
            field: 'driverId'
        },
        passengerId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Users,
            referencesKey: 'id',
            field:'passengerId'
        },
        adId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: Ads,
            referencesKey:'id',
            field: 'adId'
        },
        seatsCount:{
            type:Sequelize.INTEGER,
            allowNull:false,
            field:'seatsCount'
        },
        totalPrice:{
            type:Sequelize.INTEGER,
            allowNull:false,
            field:'totalPrice'
        }
    },{
        modelName: 'Orders',
        tableName: 'Orders',
        timestamps: false
    });

    return Orders;
}