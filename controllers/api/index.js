const router = require('express').router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const postRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('./comments', commentRoutes);
router.use('./posts', postRoutes);

module.exports = router;