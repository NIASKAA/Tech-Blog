const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
   Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(error => {
        console.log(error);
        res.status(400).json(error);
    });
});

router.get('/:id', (req, res) => {
   Comment.findAll({
      where: {
         post_id: req.params.id
      }
   })
    .then(commentData => res.json(commentData))
    .catch(error => {
        console.log(error);
        res.status(400).json(error);
    });
});

router.post('/', withAuth, (req, res) => {
   if (req.session) {
     Comment.create({
       comment_text: req.body.comment_text,
       post_id: req.body.post_id,
       userID: req.session.userID
    })
    .then(commentData => res.json(commentData))
    .catch(error => {
        console.log(error);
        res.status(400).json(error);
    });
   }
 });

router.delete('/:id', (req, res) => {
   Comment.destroy(
      {
         where: {
            id: req.params.id
         }
    })
    .then(commentData => {
        if(commentData) {
            res.status(404).json({ message: 'No comment found with id' });
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