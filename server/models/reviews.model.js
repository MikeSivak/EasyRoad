const { users } = require('.');

module.exports = (sequelize, Sequelize) => {
    const Reviews = sequelize.define('Reviews', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        driverId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'userId'
        },
        passengerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'userId'
        },
        rate: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'rate'
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'comment'
        }

    }, {
        modelName: 'Reviews',
        tableName: 'Reviews',
        timestamps: false
    });

    return Reviews;
}