export class AccountRepository {
    constructor(knex) {
        this.knex = knex;
        this.table = "accounts"
    }

    async insert(address) {
        await this.knex(this.table).insert({address});
    }

    async getAddresses() {
        return await this.knex('accounts').select('address');
    }
}