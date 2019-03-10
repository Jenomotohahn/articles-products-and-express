const knex = require('./database');

knex.select().from('test')
    .then((coll) => {
        console.log(coll);
        console.log(process.env)
        process.exit();
    });