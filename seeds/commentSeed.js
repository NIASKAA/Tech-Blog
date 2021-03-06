const {Comment} = require('../models');

const commentData = [
    {
        userID: 2,
        post_id: 1,
        comment_text: "I wonder when I can get my hands on one.",
    },
    {
        userID: 3,
        post_id: 2,
        comment_text: "Wow, what did he do this time?",
    },
    {
        userID: 1,
        post_id: 3,
        comment_text: "That makes me feel some type of way",
    }
];

const commentSeed = () => Comment.bulkCreate(commentData);

module.exports = commentSeed;