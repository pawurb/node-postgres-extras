"use strict";

const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL
const fs = require('fs')
const path = require('path')

const QUERIES = [
  'bloat', 'blocking', 'cache_hit',
  'calls', 'extensions', 'table_cache_hit', 'index_cache_hit',
  'index_size', 'index_usage', 'locks', 'all_locks',
  'long_running_queries', 'mandelbrot', 'outliers',
  'records_rank', 'seq_scans', 'table_indexes_size',
  'table_size', 'total_index_size', 'total_table_size',
  'unused_indexes', 'vacuum_stats', 'kill_all'
]


var PostgresExtras = {}

QUERIES.forEach((query_name) => {
  PostgresExtras[query_name] = (opts = {}) => {
    // const client = new Client({
    //   connectionString: connectionString,
    // })

    // client.connect()
    var file_path = path.join(__dirname, 'queries', `${query_name}.sql`)
    console.log(file_path);
    fs.readFile(file_path, 'utf8', (err, query) => {
      console.log(err);
      console.log(query);
    })

    // client.query('SELECT NOW()', (err, res) => {
    //   console.log(err, res)
    // })

    // client.end()
    console.log(__dirname);
    return "dupa"
  }
});

exports.PostgresExtras = PostgresExtras
