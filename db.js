const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_POST,
    database: process.env.PG_DATABASE
};

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    //ssl added during debugging: https://devcenter.heroku.com/articles/heroku-postgresql#heroku-postgres-ssl
    ssl: {
      rejectUnauthorized: false
    } // comes from a heroku addon
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

module.exports = pool;