const {Router} = require('express')
const router = new Router()
const AdminController = require('../controllers/adminController')
const {body} = require('express-validator')
const roleMiddleware = require("../middleware/roleMiddleware");


router.get('/user',
    roleMiddleware(["ADMIN"]),
    AdminController.getUsers
)
router.get('/logs',
    roleMiddleware(["ADMIN"]),
    AdminController.getLogs
)

router.post('/user',
    body('name').isLength({min: 3, max: 32}),
    body('email').isEmail(),
    roleMiddleware(["ADMIN"]),
    AdminController.createUser
)

module.exports = router
