const { Users } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Reviews = sequelize.define('Reviews', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        driverId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Users,
            referencesKey: 'id',
            field: 'driverId',
            onDelete: 'CASCADE'
        },
        passengerId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Users,
            referencesKey: 'id',
            field:'passengerId',
            onDelete: 'CASCADE'
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