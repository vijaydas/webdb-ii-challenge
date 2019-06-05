const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // required only for sqlite3
  //debug: true
};

const db = knex(knexConfig);

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('bears');
}

function findById(id) {
    return db('bears')
      .where({ id })
      .first();
  }

function add(zoo) {
    return db('bears')
    .insert(zoo)
   // .first();
}

function update(id, changes) {
    return db('bears')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db('bears')
    .where({id})
    .del()
}


