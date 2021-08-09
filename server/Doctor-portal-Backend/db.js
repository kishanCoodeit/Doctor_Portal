const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "sa123",
  database: "postgres",
  host: "localhost",
});

module.exports = pool;
