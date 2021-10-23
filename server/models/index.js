const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    // port: dbConfig.PORT,
    dialect: 'postgres',
    operatorsAliases: 0,
});


const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require('./roles.model.js')(sequelize, Sequelize);
db.users = require('./users.model.js')(sequelize, Sequelize);
db.countries = require('./countries.model')(sequelize, Sequelize);
db.cities = require('./cities.model.js')(sequelize, Sequelize);
db.cars = require('./cars.model.js')(sequelize, Sequelize);
db.ads = require('./ads.model.js')(sequelize, Sequelize);
db.travel_history = require('./travel_history.model.js')(sequelize, Sequelize);
db.reviews = require('./reviews.model.js')(sequelize, Sequelize);

module.exports = db;