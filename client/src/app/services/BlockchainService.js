import {$api} from "../http";

export default class BlockchainService {
    static async getAddressInfo(address) {
        return $api.get(`/explorer/${address}`);
    }
    // static async getTransactions(address, blockchain) {
    //     return $api.get(`/transaction/${address}/group?blockchain=${blockchain}`);
    // }
}