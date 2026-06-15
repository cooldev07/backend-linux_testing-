// db.js
require("dotenv").config();
const { Pool } = require("pg");

// create connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// create table and insert dummy data if not present
const setupDB = async () => {
  try {
    // create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        city VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("✅ users table ready");

    // check if dummy data already exists
    const existing = await pool.query("SELECT COUNT(*) FROM users");
    const count = parseInt(existing.rows[0].count);

    // only insert if table is empty
    if (count === 0) {
      await pool.query(`
        INSERT INTO users (name, email, city) VALUES
        ('Gogul',  'gogul@gmail.com',  'Chennai'),
        ('Arun',   'arun@gmail.com',   'Mumbai'),
        ('Priya',  'priya@gmail.com',  'Bangalore'),
        ('Rahul',  'rahul@gmail.com',  'Delhi'),
        ('Sneha',  'sneha@gmail.com',  'Hyderabad')
      `);
      console.log("✅ dummy users inserted");
    } else {
      console.log("✅ users already exist, skipping insert");
    }
  } catch (err) {
    console.error("❌ DB setup error:", err.message);
  }
};

module.exports = { pool, setupDB };
