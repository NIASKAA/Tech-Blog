const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'orjtv7oyp03uvqhr',
    password: 'pihsv40ss7mqrbh8',
    dialect: 'mysql',
    database: 'z8qq4t20bhgroauq',
    port: 3306
  });
}

  
module.exports = sequelize;