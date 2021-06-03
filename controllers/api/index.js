const router = require('express').router();

const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('./comments', commentRoutes);
router.use('./posts', postRoutes);

module.exports = router;