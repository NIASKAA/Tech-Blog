const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
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
        const post = postData.map(post => post.get({plain: true}));
        res.render('dashboard', {post, loggedIn: req.session.loggedIn});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: {
            model: User,
            attributes: [username]
        },
        attributes: [{
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
        }]
    })
    .then(postData => {
        if(!postData) {
            res.status(404).json({message: 'No post found with id'});
            return;
        }
        const post = postData.get({plain: true});
        console.log(post);
        res.render('post-edit', {post, loggedIn: req.session.loggedIn});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;