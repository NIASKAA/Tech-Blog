const sequelize = require('../config/connection');
const userSeed = require('./userSeed');
const postSeed = require('./postSeed');
const commentSeed = require('./commentSeed');

const seedAll = async () => {
    await sequelize.sync({force: true});
    await commentSeed();
    await postSeed();
    await userSeed();
    process.exit(0);
};

seedAll();