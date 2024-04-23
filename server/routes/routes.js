const {Router} = require('express')

const authMiddleware = require("../middleware/authMiddleware");

const router = new Router()
const adminRouter = require('./adminRouter')
const authRouter = require('./authRouter')
const explorerRouter = require('./explorerRouter')

router.use('/admin',
    authMiddleware,
    adminRouter
)
router.use('/explorer',
    authMiddleware,
    explorerRouter
)
router.use('/auth', authRouter)

module.exports = router
