
const BitcoinAddressDto = require('../dtos/bitcoinAddressDto');
const EthereumAddressDto = require('../dtos/ethereumAddressDto');
class ExplorerService {

    // все всех экспешенах по идее нужно юзать throw new ApiError ведь для этого этот класс и создавался

    async getBitcoinAddressInfo(address) {

        try {
            const url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}?limit=2000`;
            const params = new URLSearchParams({
            });
            const response = await fetch(`${url}?${params}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const btcCurrent = await this.getBtcToUsdPrice();

            return new BitcoinAddressDto({...data, btc_current_price: btcCurrent })

        } catch (error) {
            console.error("Error occurred:", error.message);
        }


    }

    async getEthereumAddressInfo(address) {
        try {
            const url = `https://leap.oraclus.com/v1/address/ethereum/${address}`;
            const params = new URLSearchParams({
            });
            const response = await fetch(`${url}?${params}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.wallet_age_days) {
                return new Error(`This Ethereum address ${address} is invalid! `);

            }

            console.log(" \n\n\n\ ")
            console.log(data)
            console.log(" \n\n\n\ ")

            // return data
            return new EthereumAddressDto({...data })

        } catch (error) {
            console.error("Error occurred:", error.message);
        }


    }
    async getBtcToUsdPrice() {
        try {
            const url = 'https://api.coingecko.com/api/v3/simple/price';
            const params = new URLSearchParams({
                ids: 'bitcoin',
                vs_currencies: 'usd'
            });
            const response = await fetch(`${url}?${params}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return data.bitcoin.usd;
            // console.log("Current BTC Price (USD):", btcPrice);
        } catch (error) {
            console.error("Error occurred:", error.message);
        }
    }
}

module.exports = new ExplorerService();