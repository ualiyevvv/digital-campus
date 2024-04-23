const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')
const ApiError = require('../error/ApiError');
class TokenService {
    generateToken(payload) {
        // разные secret key для refresh and access
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }

    }

    async saveToken(userId, refreshToken) {
        // при таком подходе одна сессия на одного пользователя, т.е если этот пользователь авторизуется с другого устройства то этот токен станет неактивным, т.к перезапишется другим, т.е новая запись будет
        // токены перезаписываются, а также умирают. нужно продумать механизм который удаляет протухшие токены из бд чтобы не образовалась свалка из недействующих токенов
        // console.log('INPUUUT DATAAAAAAAAA', userId, refreshToken)
        const tokenData = await Token.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            // что за save ?? это метод объекта модели бд, т.е сохранить запись в бд??
            return tokenData.save();
        }
        // console.log('INPUUUT DATAAAAAAAAAOOOOOOOO', tokenData )

        return await Token.create({userId, refreshToken});
    }

    async removeToken(refreshToken){
        if (!refreshToken) {
            throw ApiError.badRequest('Refresh token does not exist', [])
        }
        return await Token.destroy({where: {refreshToken}});
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (e) {
            return null;

        }
    }

    validateAccessToken(token) {
        // console.log('\n\n\n\n',token)
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (e) {
            return null;

        }
    }

    async findToken(refreshToken) {
        return await Token.findOne({where: {refreshToken}});
    }

}

module.exports = new TokenService();