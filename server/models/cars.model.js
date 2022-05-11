const { Users } = require(".");

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
        carNumber:{
            type:Sequelize.STRING,
            allowNull:false,
            field: 'carNumber'
        },
        carPhotoLink:{
            type: Sequelize.STRING,
            allowNull: true,
            field: 'carPhotoLink'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Users,
            referencesKey: 'id',
            field: 'userId',
            onDelete: 'CASCADE'
        },
    },{
        modelName: 'Cars',
        tableName: 'Cars',
        timestamps: false
    });
    
    return Cars;
}