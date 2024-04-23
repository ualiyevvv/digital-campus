const ApiError = require("../error/ApiError")
const explorerService = require('../services/explorerService')
const reqlogService = require('../services/reqlogService')
const noteService = require('../services/noteService')
const {validationResult} = require('express-validator')

class ExplorerController {


    async getAddressInfo(req, res, next) {
        const address = req.params.address;

        // логируем запрос в бд
        await reqlogService.create(address, req.user.id)

        let firstTwoChars = address.substring(0, 2);

        try {
            let addressInfo;

            if (firstTwoChars === '0x') {
                addressInfo = await explorerService.getEthereumAddressInfo(address);
            } else {
                addressInfo = await explorerService.getBitcoinAddressInfo(address);
            }

            return res.json(addressInfo);
        } catch(e) {
            next(e)
        }
    }

    async createNote(req, res, next) {

        const { resource, text } = req.body

        try {
            const note = await noteService.create(resource, text, req.user.id)

            return res.json(note);
        } catch(e) {
            next(e)
        }
    }

    async getAllNotesByAddress(req, res, next) {

        const address = req.params.address;

        try {
            const note = await noteService.getAll(address)

            return res.json(note);
        } catch(e) {
            next(e)
        }
    }


}

module.exports = new ExplorerController()