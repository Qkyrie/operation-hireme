export class TransactionRepository {
    constructor(knex) {
        this.knex = knex
        this.table = 'transaction'
    }

    async insertTransactions(transactions) {
        try {
            return this.knex(this.table).insert(
                transactions
            ).onConflict('transactionHash').merge();
        } catch (ex) {
            console.log('unable to insert', transactions);
        }
    }
}