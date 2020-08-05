"use strict";

const { Client } = require('pg')
const pkgDir = require('pkg-dir');
const connectionString = process.env.DATABASE_URL

const QUERIES = [
  'bloat', 'blocking', 'cache_hit',
  'calls', 'extensions', 'table_cache_hit index_cache_hit',
  'index_size', 'index_usage', 'locks', 'all_locks',
  'long_running_queries', 'mandelbrot', 'outliers',
  'records_rank', 'seq_scans', 'table_indexes_size',
  'table_size', 'total_index_size', 'total_table_size',
  'unused_indexes', 'vacuum_stats', 'kill_all'
]

const client = new Client({
  connectionString: connectionString,
})

client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

var PGExtras = {}

QUERIES.forEach((element) => {
  PGExtras[element] = (opts = {}) => {
    console.log(pkgDir.sync(__dirname));
    console.log(__dirname);
    return "dupa"
  }
});

exports.PGExtras = PGExtras
