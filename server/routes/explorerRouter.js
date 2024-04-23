const {Router} = require('express')
const router = new Router()
const ExplorerController = require('../controllers/explorerController')
const {body} = require('express-validator')
const roleMiddleware = require("../middleware/roleMiddleware");


// TODO Admin middleware
router.get('/:address',
    ExplorerController.getAddressInfo
)
router.post('/note',
    body('resource').isLength({min: 3}),
    body('text').isLength({min: 3}),
    ExplorerController.createNote
)
router.get('/note/:address',
    ExplorerController.getAllNotesByAddress
)

module.exports = router
