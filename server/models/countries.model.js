module.exports = (sequelize, Sequelize) =>{
    const Countries = sequelize.define('Countries', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        countryName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'countryName'
        }
    },{
        modelName: 'Countries',
        tableName: 'Countries',
        timestamps: false
    });
    
    return Countries;
}