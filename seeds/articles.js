
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('articles').del()
        .then(function () {
            // Inserts seed entries
            return knex('articles').insert([
                { title: 'Cats1', body: 'body1', author: 'author1', url: 'urlexam' },
                { title: 'Dogs1', body: 'body2', author: 'author2', url:'url2'}
            ]);
        });
};
