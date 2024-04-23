const ApiError = require('../error/ApiError')
const tokenService = require('../services/tokenService');

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

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

            let hasRole = false
            // userRoles.forEach(role => {
            if (roles.includes(userData.role)) {
                hasRole = true
            }
            // })
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }

            next();
        } catch (e) {
            return next(ApiError.unauthorizedRequest());
        }
    }
}
