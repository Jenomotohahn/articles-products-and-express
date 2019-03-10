exports.up = function (knex, Promise) {
    return knex.schema.createTable('test', (table) => {
        table.increments();
        table.string('coll').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('test')
};