const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [{
            model: Comment,
            attributes: [
                'id',
                'post_id',
                'userID',
                'comment_text',
                'created_at'
            ],
            include: {
                model: User,
                attributes: [username]
            } 
        },
        {
            model: User,
            attributes: [username]
        }]
    })
    .then(postData => {
        
    })
})