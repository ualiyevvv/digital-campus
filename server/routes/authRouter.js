const {Router} = require('express')
const router = new Router()
const AuthController = require('../controllers/authController')
const {body} = require('express-validator')

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    AuthController.login
)
// router.post('/check-code',
router.post('/activate',
    body('email').isEmail(),
    body('code').isNumeric(),
    AuthController.checkCode
)
router.post('/logout', AuthController.logout)
// router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)


module.exports = router
