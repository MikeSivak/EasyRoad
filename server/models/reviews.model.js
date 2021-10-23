const { users } = require('../models');

module.exports = (sequelize, Sequelize) =>{
    const reviews = sequelize.define('reviews', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'id_user'
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'comment'
        }

    },{
        modelName: 'reviews',
        tableName: 'reviews',
        timestamps: false
    });
    
    return reviews;
}