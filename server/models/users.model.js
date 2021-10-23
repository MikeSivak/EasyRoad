const db = require('../models');
const roles = db.roles;

module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        user_email: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'user_email'
        },
        user_password: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'user_password'
        },
        user_number: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'user_number'
        },
        id_role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: roles,
            referencesKey: 'id',
            field: 'id_role'
        },
        us_name: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'us_name'
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'gender'
        },
        user_status: {  //1-unblocked, 2-blocked
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'user_status'    
        }
    },{
        modelName: 'users',
        tableName: 'users',
        timestamps: false
    });

    return users;
}