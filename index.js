const knex = require('./database');

knex.select().from('test')
    .then((coll) => {
        console.log(coll);
        process.exit();
    });