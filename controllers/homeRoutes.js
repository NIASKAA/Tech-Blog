const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes:[
                'id',
                'userID',
                'post_id',
                'comment_text',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['username']
            },
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    .then(postData => {
        console.log(postData[0]);
        const posts = postData.map(post => post.get({plain: true}));
        res.render('homepage', {posts, loggedIn: req.session.loggedIn});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
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
                'userID',
                'post_id',
                'comment_text',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    .then(postData => {
        if(!postData) {
            res.status(404).json({message: 'No post found'});
            return;
        }
        const post = postData.get({plain: true});
        res.render('post', {post, loggedIn: req.session.loggedIn});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;