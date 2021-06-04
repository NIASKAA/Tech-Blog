const {Post} = require('../models');

const postData = [
    {
        title: "RTX 3090 on sale!",
        content: "Holy moly, 3090 are on sale at your local microcenter! Sike. You ain't going to get one.",
        userID: 1
    },
    {
        title: "ELON MUSK BACK AT IT AGAIN",
        content: "Elon Musk back at it again by tweeting bullcrap things.",
        userID: 2
    },
    {
        title: "Bit Coin dropping",
        content: "Did I ever mentioned about Elon Musk? Yea, look what happened cause of him.",
        userID: 3
    }
];

const postSeed = () => Post.bulkCreate(postData);

module.exports = postSeed;