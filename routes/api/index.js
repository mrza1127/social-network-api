const router = require('express').Router();
const userRoutes = require('./routes-user')
const thoughtRoutes = require('./routes-thoughts')


router.use('/thoughts', thoughtRoutes)
router.use('/users', userRoutes)

module.exports = router;