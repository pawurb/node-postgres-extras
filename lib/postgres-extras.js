"use strict";

const { Client } = require('pg')
const fs = require('fs')
const path = require('path')
var AsciiTable = require('ascii-table')

const QUERIES = [
  'bloat', 'blocking', 'cache_hit',
  'calls', 'extensions', 'table_cache_hit', 'index_cache_hit',
  'index_size', 'index_usage', 'locks', 'all_locks',
  'long_running_queries', 'mandelbrot', 'outliers',
  'records_rank', 'seq_scans', 'table_indexes_size',
  'table_size', 'total_index_size', 'total_table_size',
  'unused_indexes', 'vacuum_stats', 'kill_all'
]

var runQueryMaker = (query_name) => {
  return (opts={}) => {
    return new Promise((resolve, reject) => {
      var clientOpts = {}
      if(opts.database_url) {
        clientOpts['connectionString'] = opts.database_url
      } else if(process.env.DATABASE_URL) {
        clientOpts['connectionString'] = process.env.DATABASE_URL
      }

      var file_path = path.join(__dirname, 'queries', `${query_name}.sql`)
      fs.readFile(file_path, 'utf8', (err, query) => {
        var pg_client;

        if(err) {
          return reject(err)
        }

        try {
          pg_client = new Client(clientOpts)
          pg_client.connect()
        } catch(e) {
          return reject(e)
        }

        pg_client.query(query).then((res) => {
          pg_client.end()

          if(!opts.silent) {
            var table = new AsciiTable('A Title')

            table.setHeading(
              ...res.fields.map((field_data) => {
                return field_data.name
              })
            )

            res.rows.forEach((row) => {
              table.addRow(...Object.values(row))
            })

            console.log(table.toString())
          }
          resolve({
            rows: res.rows,
            fields: res.fields
          })
        }).catch((e) => {
          reject(e)
        })
      })
    })
  }
}

var PostgresExtras = {
  query: (query_name, opts={}) => {
    return runQueryMaker(query_name)(opts)
  }
}

QUERIES.forEach((query_name) => {
  PostgresExtras[query_name] = runQueryMaker(query_name);
});

exports.PostgresExtras = PostgresExtras
