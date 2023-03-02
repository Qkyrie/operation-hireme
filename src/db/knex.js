import knex  from "knex";


const myKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: './data.db',
    },
    useNullAsDefault: true,
});

export function getKnex() {
    return myKnex;
}