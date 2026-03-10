const { Pool } = require("pg");

// Detect environment
const isLocal = process.env.NODE_ENV !== "production";

const pool = new Pool({
  connectionString: isLocal ? process.env.DATABASE_URL_LOCAL : process.env.DATABASE_URL,
  ssl: isLocal
    ? false              // Local me SSL off
    : { rejectUnauthorized: false }, // Vercel serverless SSL required
  max: 5,                 // serverless friendly
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => console.log("PostgreSQL connected"));

module.exports = pool;