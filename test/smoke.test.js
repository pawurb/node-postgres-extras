const PostgresExtras = require("../lib/postgres-extras").PostgresExtras

const database_url = process.env.DATABASE_URL || "postgresql://postgres:secretpass097321@localhost:5432/node-postgres-extras"

test('query succedeed', (done) => {
  PostgresExtras.query('cache_hit', {
      database_url,
      format: 'raw'
    }
  ).then((result) => {
    expect(result.rows[0].name).toBe('index hit rate')
    done()
  })
});
