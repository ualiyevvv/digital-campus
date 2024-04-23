import {$api} from "../http";

export default class ReqlogsService {
    static async getReqlogs() {
        return $api.get('/admin/logs');
    }


}