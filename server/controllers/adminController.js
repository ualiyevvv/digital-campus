const ApiError = require("../error/ApiError")
const userService = require('../services/userService')
const reqlogService = require('../services/reqlogService')
const {validationResult} = require('express-validator')

class AdminController {

    async createUser(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }

            const {email, name} = req.body;

            const user = await userService.create(email, name);


            return res.json(user);
        } catch(e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch(e) {
            next(e)
        }
    }

    async getLogs(req, res, next) {
        try {
            const logs = await reqlogService.getAllLogs();
            return res.json(logs);
        } catch(e) {
            next(e)
        }
    }

}

module.exports = new AdminController()