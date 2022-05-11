const { Roles } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('Users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Roles,
            referencesKey: 'id',
            field: 'roleId',
            onDelete: 'CASCADE'
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'userName'
        },
        userPhone: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'userPhone'
        },
        userEmail: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'userEmail'
        },
        userPassword: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'userPassword'
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'gender'
        },
        userPhoto:{
            type:Sequelize.STRING,
            allowNull:true,
            field:'userPhoto'
        },
        userStatus: {  //1-unblocked, 2-blocked
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'userStatus'    
        },
        rate: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            field: 'rate'
        }
    },{
        modelName: 'Users',
        tableName: 'Users',
        timestamps: false
    });

    return Users;
}