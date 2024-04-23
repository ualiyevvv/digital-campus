const { Sequelize } = require('sequelize');
const {User, VerfCodes} = require("../models/models");
const moment = require('moment');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const crypto = require('crypto');
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize')
class AuthService {

    generateSixDigitCode() {
        const min = 100000; // Минимальное значение (включительно)
        const max = 999999; // Максимальное значение (включительно)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async sendCode(email) {
        const verificationCode = this.generateSixDigitCode()
        const user = await User.findOne({email})
        if (!user) {
            throw ApiError.badRequest(`User with this email ${email} does not exists`);
        }
        const oldCode = await VerfCodes.findOne({where: {email, isActive: true}})
        if (oldCode) {
            oldCode.isActive = false;
            oldCode.save()
        }
        // const user = await User.create({email})
        const code = await VerfCodes.create({email, code: verificationCode})

        await mailService.sendActivationMail(email, verificationCode);
    }

    async checkCode(email, code) {
        const fiveMinutesAgo = moment().subtract(0.4, 'minutes');
        const verfVode = await VerfCodes.findOne({
            where: {
                email,
                code,
                isActive: true,
                createdAt: {
                    [Sequelize.Op.gte]: fiveMinutesAgo.toDate(),
                },
            }
        })

        if (!verfVode) {
            throw ApiError.badRequest('Code is not valid');
        }

        verfVode.isActive = false;
        verfVode.save();
        const user = await User.findOne({where: {email}})
        user.email_confirmed = new Date();
        user.save()

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})

        // тут насколько критично вытващить id пользователя из модели user или userDto ??
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const candidate = await User.findOne({where: {email}});
        if (!candidate) {
            // // Генерируем случайные байты
            // const randomBytes = crypto.randomBytes(20); // 16 байтов = 128 бит
            // // Преобразуем байты в шестнадцатеричную строку (хэш)
            // const randomHash = randomBytes.toString('hex');
            throw ApiError.badRequest(`User with this email ${email} does not exist`)
        }

        const isPassEquals = await bcrypt.compare(password, candidate.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Incorrect password');
        }

        this.sendCode(email)

        // const userDto = new UserDto(user);
        // const tokens = tokenService.generateToken({...userDto});
        // // тут насколько критично вытващить id пользователя из модели user или userDto ??
        // await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            status: 'code sent'
        }
    }

    async activate(activationLink) {
        const user  = await User.findOne({where: {activationLink}})
        if (!user) {
            throw ApiError.badRequest('Incorrect activation code')
        }
        user.isActivated = true
        await user.save();
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedRequest();
        }
        // console.log(refreshToken)

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        // console.log('\n\n\n',userData)
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedRequest()
        }
        const user = await User.findOne({where: userData.id})
        if (!user) {
            throw ApiError.badRequest('User does not exist')
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        // тут насколько критично вытващить id пользователя из модели user или userDto ??
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

}

module.exports = new AuthService();