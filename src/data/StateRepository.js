export class StateRepository {

    constructor(knex) {
        this.knex = knex
        this.table = 'state'
    }

    async getState(key) {
        return this.knex(this.table).where('key', key).first()
    }

    async setState(key, value) {
        return this.knex(this.table).insert({key, value}).onConflict('key').merge();
    }
}