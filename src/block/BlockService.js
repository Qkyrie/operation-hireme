export class BlockService {

    constructor(web3, web3limiter) {
        this.web3 = web3
        this.web3limiter = web3limiter
    }

    async getLatestBlock() {
        const wrapped = this.web3limiter.wrap(this.web3.eth.getBlock);
        return await wrapped('finalized')
    }

    async getBlock(blockNumber) {
        console.log('getting block with number ', blockNumber);
        const wrapped = this.web3.eth.getBlock
        return await wrapped(blockNumber);
    }

    async getBlockListener(onBlock, onError) {
        return this.web3.eth.subscribe('newBlockHeaders').on(
            'data', (blockHeader) => {
                onBlock(blockHeader);
            }
        ).on('error', (error) => {
            onError(error);
        });
    }
}

