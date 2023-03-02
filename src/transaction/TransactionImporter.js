export class TransactionImporter {

    constructor(blockService, stateRepository, transactionService, chainService) {
        this.blockService = blockService
        this.stateRepository = stateRepository
        this.transactionService = transactionService;
        this.chainService = chainService;
    }

    async handle(currentBlock) {
        const block = await this.blockService.getBlock(currentBlock)

        const transactions = await Promise.all(block.transactions.map(async (transactionHash) => {
            const transaction = await this.transactionService.getTransactionData(transactionHash);
            return {
                chain: await this.chainService.getChainId(),
                transactionHash: transaction.transactionHash,
                cumulativeGasUsed: transaction.cumulativeGasUsed,
                value: 0,
                effectiveGasPrice: transaction.effectiveGasPrice,
                from: transaction.from,
                to: transaction.to,
                status: transaction.status,
                blockNumber: transaction.blockNumber,
            }
        }));

        try {
            const result = await this.transactionService.save(transactions);
            await this.stateRepository.setState('latest-block', block.number);
            console.log('imported', result, ' transactions from block ', currentBlock);
        } catch (ex) {
            console.error(ex);
        }
    }
}