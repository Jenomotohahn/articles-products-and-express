
exports.up = function (knex, Promise) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('price').notNullable();
        table.string('inventory').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('products')
};