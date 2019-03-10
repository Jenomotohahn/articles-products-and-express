
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('products').del()
        .then(function () {
            // Inserts seed entries
            return knex('products').insert([
                { name: 'waterdmelon', price: 1, inventory: 10 }
            ]);
        });
};
