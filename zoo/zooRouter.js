const express = require("express");
const router = express.Router();
const knex = require('knex');

// this configuration object teaches knex how to find the database and what driver to use
const knexConfig = {
    client: 'sqlite3', // the sqlite3 database driver
    useNullAsDefault: true, // needed when working with SQLite
    connection: {
      // relative to the root folder
      filename: './data/lambda.db3', // path to the database file
      // if the database does not exist an empty one with this name will be created
    },
  };
  
  const db = knex(knexConfig);


  




module.exports = router;
