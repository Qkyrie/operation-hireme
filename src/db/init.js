import {getKnex} from "./knex.js";

export async function createDb() {
    let knex = getKnex();
    await knex.schema.createTableIfNotExists('accounts', function (table) {
        table.string('address').primary();
    });

    await knex.schema.createTableIfNotExists('state', function (table) {
        table.string("key").primary();
        table.string("value");
    });

    await knex.schema.createTableIfNotExists('transaction', function (table) {
        table.string("transactionHash").primary();
        table.string("chain");
        table.bigint("blockNumber");
        table.bigint("cumulativeGasUsed");
        table.bigint("effectiveGasPrice");
        table.string('from');
        table.string("to").nullable();
        table.bigint("value");
        table.boolean('status')
    });
}

createDb().then(() => {
    console.log('Database created');
    process.exit(0);
});