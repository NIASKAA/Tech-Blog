const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'userID'
});

User.hasMany(Comment, {
    foreignKey: 'userID',
    onDelete: 'cascade'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Post.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'cascade'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

module.exports = {User, Comment, Post};