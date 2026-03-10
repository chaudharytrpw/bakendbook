// db.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

pool.on("connect", () => {
  console.log("PostgreSQL connected (Supabase)");
});

module.exports = pool;