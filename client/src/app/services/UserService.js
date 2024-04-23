import {$api} from "../http";

export default class UserService {
    static async getUsers() {
        return $api.get('/admin/user');
    }

    static async createUser(name, email) {
        return $api.post('/admin/user', {name, email});
    }

}