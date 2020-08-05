"use strict";

const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL

const client = new Client({
  connectionString: connectionString,
})

client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

var PGExtras = { dupa: true }

exports.PGExtras = PGExtras
