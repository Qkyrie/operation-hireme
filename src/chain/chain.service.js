export class ChainService {
    chainService;

    constructor(web3) {
        this.web3 = web3;
    }


    //cache
    chainId = null;

    async getChainId() {
        if (!this.chainId) {
            this.chainId = await this.web3.eth.getChainId()
        }
        return this.chainId;
    }
}