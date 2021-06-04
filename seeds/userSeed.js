const {User} = require('../models');

const userData = [{
    username: 'IloveBoba',
    password: 'boba',
    email: 'boba@gmail.com'
},
{
    username: 'Obama',
    password: 'angryTranslator',
    email: 'presidentobama@gmail.com'
},
{
    username: 'Kayne',
    password: 'gaga',
    email: 'iusedtolovekayne@gmail.com'
}];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;