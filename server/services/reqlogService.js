const {ReqLog, User} = require("../models/models");
const ApiError = require('../error/ApiError');
class ReqlogService {

    async create(resource, userId) {


        const reqlog = await ReqLog.create({resource, actor_id: userId})


        return {
            reqlog
        }
    }


    async getAllLogs() {
        return await ReqLog.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['role', 'name', 'email'] // Select specific user attributes you want to include
            }]
        });
    }

    async getLogByUserId(userId) {
        const reqlog = await ReqLog.findOne({where:{actor_id:userId}})
        if (!reqlog) {
            throw ApiError.badRequest(`ReqLog with this user_id ${userId} does not exist`)
        }

        return {
            reqlog
        }
    }

}

module.exports = new ReqlogService();