// const dbConfig = require('../config/db.config.js');
// const Sequelize = require('sequelize');

// // connection to created database
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     // port: dbConfig.PORT, -- is not require for some databases
//     dialect: 'postgres',
//     operatorsAliases: 0,
// });


// // create object for save database entities
// const db = {}

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.Roles = require('./Roles.model.js')(sequelize, Sequelize);
// db.Users = require('./Users.model.js')(sequelize, Sequelize);
// db.Addresses = require('./Addresses.model.js')(sequelize, Sequelize);
// db.Cars = require('./Cars.model.js')(sequelize, Sequelize);
// db.Ads = require('./Ads.model.js')(sequelize, Sequelize);
// db.Orders = require('./Orders.model.js')(sequelize, Sequelize);
// db.Reviews = require('./Reviews.model.js')(sequelize, Sequelize);


// // -- relationships between tables --

// // between Users and Roles
// db.Users.belongsTo(db.Roles, {
//     foreignKey: 'roleId'
// });
// db.Roles.hasMany(db.Users); //role has many Users records

// // between Users and Reviews
// db.Reviews.belongsTo(db.Users, {
//     foreignKey: 'driverId'
// });
// db.Reviews.belongsTo(db.Users, {
//     foreignKey: 'passengerId'
// });
// db.Users.hasMany(db.Reviews); //user has many Reviews records

// //between Orders and Ads
// db.Orders.belongsTo(db.Ads, {
//     foreignKey: 'adId'
// });
// db.Ads.hasMany(db.Orders);

// //between Orders and Users
// db.Orders.belongsTo(db.Users, { as: 'DriverId', foreignKey: 'driverId' });
// db.Orders.belongsTo(db.Users, { as: 'PassengerId', foreignKey: 'passengerId'});
// db.Users.hasMany(db.Orders);

// //between Ads and Users
// db.Ads.belongsTo(db.Users, {
//     foreignKey: 'userId'
// });
// db.Users.hasMany(db.Ads);

// //between Users and Cars
// db.Cars.belongsTo(db.Users, {
//     foreignKey: 'userId'
// });
// db.Users.hasMany(db.Cars);

// // ----------------------------------

// module.exports = db;


const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

// connection to created database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    // port: dbConfig.PORT, -- is not require for some databases
    dialect: 'postgres',
    operatorsAliases: 0,
});


// create object for save database entities
const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Roles = require('./Roles.model.js')(sequelize, Sequelize);
db.Users = require('./Users.model.js')(sequelize, Sequelize);
db.Addresses = require('./Addresses.model.js')(sequelize, Sequelize);
db.Cars = require('./Cars.model.js')(sequelize, Sequelize);
db.Ads = require('./Ads.model.js')(sequelize, Sequelize);
db.Orders = require('./Orders.model.js')(sequelize, Sequelize);
db.Reviews = require('./Reviews.model.js')(sequelize, Sequelize);


// -- relationships between tables --

// between Users and Roles
db.Users.belongsTo(db.Roles, {
    foreignKey: 'roleId',
    onDelete: 'CASCADE'
});
db.Roles.hasMany(db.Users, {
    foreignKey: 'roleId',
    sourceKey: 'id'
}); //role has many Users records

// between Users and Reviews
db.Reviews.belongsTo(db.Users, {
    foreignKey: 'driverId',
    onDelete: 'CASCADE'
});
db.Reviews.belongsTo(db.Users, {
    foreignKey: 'passengerId',
    onDelete: 'CASCADE'
});
db.Users.hasMany(db.Reviews, {
    foreignKey: 'driverId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
}); //driver has many Reviews records
db.Users.hasMany(db.Reviews, {
    foreignKey: 'driverId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
}); //passenger has many Reviews records


//between Orders and Ads
db.Orders.belongsTo(db.Ads, {
    foreignKey: 'adId',
    onDelete: 'CASCADE'
});
db.Ads.hasMany(db.Orders, {
    foreignKey: 'adId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

//between Ads and Cars
db.Ads.belongsTo(db.Cars);

//between Orders and Users
db.Orders.belongsTo(db.Users, { as: 'DriverId', foreignKey: 'driverId', onDelete: 'CASCADE' });
db.Orders.belongsTo(db.Users, { as: 'PassengerId', foreignKey: 'passengerId', onDelete: 'CASCADE' });
db.Users.hasMany(db.Orders, {
    foreignKey: 'driverId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
db.Users.hasMany(db.Orders, {
    foreignKey: 'passengerId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

//between Ads and Users
db.Ads.belongsTo(db.Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.Users.hasMany(db.Ads, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

//between Users and Cars
db.Cars.belongsTo(db.Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.Users.hasMany(db.Cars, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

// ----------------------------------

module.exports = db;