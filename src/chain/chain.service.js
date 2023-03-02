export class ChainService {
    constructor(web3) {
        this.web3 = web3;
    }
    async getChainId() {
        return this.web3.eth.getChainId();
    }
}