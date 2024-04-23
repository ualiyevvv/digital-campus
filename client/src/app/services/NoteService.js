import {$api} from "../http";

export default class NoteService {
    static async getNotes(address) {
        return $api.get(`/explorer/note/${address}`);
    }

    static async createNote(resource, text) {
        return $api.post('/explorer/note', {resource, text});
    }

}