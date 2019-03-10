
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('body').notNullable();
        table.string('author').notNullable();
        table.string('url').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
        .dropTable('articles')
};
