const knex = require('./database');

knex.select().from('test')
    .then((users) => {
        console.log(users);
        console.log(process.env)
        process.exit();
    });