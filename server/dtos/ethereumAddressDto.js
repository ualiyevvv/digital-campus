module.exports = class EthereumAddressDto {
    constructor(model) {
        this.address = model.address
        this.total_received = model.total_received || 0
        this.total_sent = model.total_sent || 0
        this.balance = model.net_worth_usd
        this.last_activity = model?.last_out;
        this.first_activity = new Date().setDate(new Date().getDate() - model?.wallet_age_days);
        this.assets = model.assets || [];
        this.txrefs = model.txrefs || [];
        this.blockchain = 'ethereum'
    }
}