module.exports = (sequelize, Sequelize) =>{
    const roles = sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        role_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'role_name'
        }
    },{
        modelName: 'roles',
        tableName: 'roles',
        timestamps: false
    });
    
    return roles;
}