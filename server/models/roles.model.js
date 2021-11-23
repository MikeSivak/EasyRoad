module.exports = (sequelize, Sequelize) =>{
    const Roles = sequelize.define('Roles', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        roleName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'roleName'
        }
    },{
        modelName: 'Roles',
        tableName: 'Roles',
        timestamps: false
    });
    
    return Roles;
}