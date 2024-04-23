module.exports = class BitcoinAddressDto {
    constructor(model) {
        this.address = model.address
        this.total_received = model.total_received
        this.total_sent = model.total_sent
        this.balance = model.balance
        this.wallet_age = []
        this.last_activity = model?.txrefs[0]?.confirmed;
        this.first_activity = model?.txrefs.pop().confirmed;
        this.tokens = [];
        this.txrefs = model.txrefs;
        this.btc_current_price = model.btc_current_price;
        this.blockchain = 'bitcoin'
    }
}