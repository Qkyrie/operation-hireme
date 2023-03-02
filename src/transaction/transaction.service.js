export class TransactionService {

    constructor(web3, web3limiter, transactionRepository) {
        this.web3 = web3;
        this.web3Limiter = web3limiter;
        this.transactionRepository = transactionRepository;
    }

    async getTransactionData(txHash) {
        const wrapped = this.web3Limiter.wrap(this.web3.eth.getTransactionReceipt);
        return await wrapped(txHash);
    }

    async save(transactions) {
        return await this.transactionRepository.insertTransactions(transactions);
    }
}

