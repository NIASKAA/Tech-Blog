const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.get('/:id', withAuth, (req, res) => {
    Comment.findAll({
        where: {
            post_id: req.session.post_id,
        }
    })
    .then(commentData => res.json(commentData))
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/', withAuth, (req, res) => {
    Comment.create({
        
    })
});

router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        post_id: req.body.post_id,
    },
    {
        where: {
            id: req.params.id,
        },
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({message: 'Comment with id not found'});
            return;
        }
        res.json(commentData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({message: 'Comment with id not found'});
            return;
        }
        res.json(commentData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;