const {Notes, User} = require("../models/models");
const ApiError = require('../error/ApiError');
class NoteService {

    async create(resource, text, userId) {


        const note = await Notes.create({resource, text, userId})


        return {
            note
        }
    }


    async getAll(address) {
        return await Notes.findAll({
            where:{resource: address},
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['email'] // Select specific user attributes you want to include
            }]
        });
    }


}

module.exports = new NoteService();