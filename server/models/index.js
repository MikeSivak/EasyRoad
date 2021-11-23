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

db.roles = require('./Roles.model.js')(sequelize, Sequelize);
db.users = require('./Users.model.js')(sequelize, Sequelize);
db.countries = require('./Countries.model')(sequelize, Sequelize);
db.cities = require('./Cities.model.js')(sequelize, Sequelize);
db.addresses = require('./Addresses.model.js')(sequelize, Sequelize);
db.cars = require('./Cars.model.js')(sequelize, Sequelize);
db.drivers_ads = require('./DriverAds.model.js')(sequelize, Sequelize);
db.passengers_ads = require('./PassengerAds.model.js')(sequelize, Sequelize);
db.travel_history = require('./TravelHistory.model.js')(sequelize, Sequelize);
db.reviews = require('./Reviews.model.js')(sequelize, Sequelize);


// -- relationships between tables --



// ----------------------------------

module.exports = db;