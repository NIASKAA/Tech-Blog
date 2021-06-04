const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {User, Post, Comment} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(userData => res.json(userData))
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at'
                ],
            },   
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'created_at'
                ],
                include: {
                    model: Post,
                    attributes: ['title'],
                }
            }
        ]
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({message: 'No user found with id'});
            return;
        }
        res.json(userData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.userID = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
    .then(userData => {
        if(!userData) {
            res.status(400).json({message: 'No user with that username'});
            return;
        }
        const truePassword = userData.checkPassword(req.body.password);
        if(!truePassword) {
            res.status(400).json({message: 'Incorrect Password'});
            return;
        }
        req.session.save(() => {
            req.session.userID = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({user: userData, message: 'Logged in successfully'});
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData[0]) {
            res.status(404).json({message: 'No user found with id'});
            return;
        }
        res.json(userData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({message: 'No user found with id'});
            return;
        }
        res.json(userData);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;