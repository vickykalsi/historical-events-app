import pg from "pg"

const pool = new pg.Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: process.env.NODE_ENV === "production" ? {
    rejectUnauthorized: false
  } : false
})

export default pool