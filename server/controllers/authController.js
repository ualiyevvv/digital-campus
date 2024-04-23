const ApiError = require("../error/ApiError")
const authService = require('../services/authService')
const {validationResult} = require('express-validator')

const secretKey = process.env.SECRET_KEY; // Замените на ваш секретный ключ
class AuthController {

    async checkCode(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }
            const {email, code} = req.body;
            const userData = await authService.checkCode(email, code);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }
            const {email, password} = req.body;

            const userData = await authService.login(email, password);

            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token)
        } catch (e) {
            next(e)
        }

    }

    async refresh(req, res, next) {
        try {
            // console.log(req.cookies)
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            next(e)
        }

    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch(e) {
            next(e)
        }
    }

}

module.exports = new AuthController()