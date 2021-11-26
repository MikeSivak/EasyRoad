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
db.Addresses = require('./Addresses.model.js')(sequelize,Sequelize);
db.Cars = require('./Cars.model.js')(sequelize, Sequelize);
db.Ads = require('./Ads.model.js')(sequelize, Sequelize);
db.Orders = require('./Orders.model.js')(sequelize, Sequelize);
db.TravelHistory = require('./TravelHistory.model.js')(sequelize, Sequelize);
db.Reviews = require('./Reviews.model.js')(sequelize, Sequelize);


// -- relationships between tables --



// ----------------------------------

module.exports = db;