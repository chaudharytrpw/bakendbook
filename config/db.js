const { Pool } = require("pg");

// Local run check
const isLocal = process.env.NODE_ENV !== "production";

const pool = new Pool({
  connectionString: isLocal ? process.env.DATABASE_URL_LOCAL : process.env.DATABASE_URL,
  ssl: isLocal
    ? false // Local me SSL off
    : { rejectUnauthorized: false }, // Vercel serverless me SSL required
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

module.exports = pool;