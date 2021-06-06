const userSeed = require('./userSeed');
const postSeed = require('./postSeed');
const commentSeed = require('./commentSeed');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log("Data Sync Successfully");
    await userSeed();
    console.log("user seeded");
    await postSeed();
    console.log("Post seeded");
    await commentSeed();
    console.log("Comment seeded");
    process.exit(0);
};

seedAll();