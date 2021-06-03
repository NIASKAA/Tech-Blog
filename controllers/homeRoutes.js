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
                'title',
                'content',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['username']
            },
        },
        {
            model: User,
            attributes: [username]
        }]
    })
    .then(postData => {
        const post = postData.map(post => post.get({plain: true}));
        res.render('homepage', {post, loggedIn: req.session.loggedIn});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
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
                'title',
                'content',
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
        if(!postData) {
            res.status(404).json({message: 'No post found'});
            return;
        }
        const post = postData.get({plain: true});
        console.log(post);
        res.render('comment', {post, loggedIn: req.session.loggedIn});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.get('/post-comment', (req, res) => {
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
                'post_id',
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
        if(!postData) {
            res.status(404).json({message: 'No post found with id'});
            return;
        }
        const post = postData.get({plain: true});
        console.log(post);
        res.render('post-comment', {post, loggedIn: req.session.loggedIn});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;