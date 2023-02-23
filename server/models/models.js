const { Pool } = require('pg');

const PG_URI = 'postgres://ohvzgffx:ynztBzbLSclwYgWS78kJfuer_M83RegH@suleiman.db.elephantsql.com/ohvzgffx';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: async(text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};