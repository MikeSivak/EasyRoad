module.exports = (sequelize, Sequelize) =>{
    const countries = sequelize.define('countries', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        country_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'country_name'
        }
    },{
        modelName: 'countries',
        tableName: 'countries',
        timestamps: false
    });
    
    return countries;
}