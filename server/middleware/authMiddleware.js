const ApiError = require('../error/ApiError')
const tokenService = require('../services/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization

        // console.log('\n\n\n\n', authorizationHeader)
        if (!authorizationHeader) {
           return next(ApiError.unauthorizedRequest());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        // console.log(accessToken)
        if (!accessToken) {
            return next(ApiError.unauthorizedRequest());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorizedRequest());
        }
        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.unauthorizedRequest());
    }
}