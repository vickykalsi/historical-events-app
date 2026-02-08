import pool from "./db.js"

async function initDB() {
  try {
    const query1 = await pool.query(`
      CREATE TABLE IF NOT EXISTS he_users(
        id serial PRIMARY KEY,
        username text UNIQUE NOT NULL,
        password_hash text NOT NULL,
        created_at timestamp DEFAULT NOW(),
        updated_at timestamp DEFAULT NOW(),
        CONSTRAINT MIN_LENGTH_USERNAME CHECK (length(username)>3),
        CONSTRAINT LOWERCASE_USERNAME CHECK (username=lower(username)),
        CONSTRAINT TRIM_USERNAME CHECK (username=trim(username))
      )
    `)
    const query2 = await pool.query(`
      CREATE TABLE IF NOT EXISTS he_bookmarks(
        id serial PRIMARY KEY,
        user_id integer NOT NULL references users(id) ON DELETE CASCADE,
        event_description text NOT NULL,
        event_year text NOT NULL,
        created_at timestamp DEFAULT NOW(),
        CONSTRAINT UNIQUE_BOOKMARK UNIQUE(user_id,event_description)
      )  
    `)
    console.log(`DB successfully started`)
  }
  catch (err) {
    console.error(`DB can't be started : ${err.message || err.statusText}`)
    process.exit(1)
  }
}

export default initDB