const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'content',
            'title',
            'created_at',
        ],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: Comment,
            attributes: [
                'id',
                'comment_text',
                'post_id',
                'userID',
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
    .then(postData => res.json(postData))
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    }); 
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at',
        ],
        include:[
            { 
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'userID',
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
            res.status(404).json({message: 'Post not found'});
            return;
        }
        res.json(postData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        userID: req.session.userID
    })
    .then(postData => res.json(postData))
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if(!postData) {
            res.status(404).json({message: 'Post not found with id'});
            return;
        }
        res.json(postData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then(postData => {
        if(!postData) {
            res.status(404).json({message: 'Post with id not found'});
            return;
        }
        res.json(postData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;