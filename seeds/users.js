
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('test').del()
    .then(function () {
      // Inserts seed entries
      return knex('test').insert([
        {id: 1, coll: 'rowValue1'},
        {id: 2, coll: 'rowValue2'},
        {id: 3, coll: 'rowValue3'}
      ]);
    });
};
