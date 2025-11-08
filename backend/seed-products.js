// backend/seed-products.js
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const sqlPath = path.join(__dirname, 'data', 'products.sql');
const dbPath = path.join(__dirname, 'data', 'products.db');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// read SQL file
const sql = fs.readFileSync(sqlPath, 'utf8');

// remove DB if exists (optional, reseed)
if (fs.existsSync(dbPath)) {
  console.log('Removing existing DB:', dbPath);
  fs.unlinkSync(dbPath);
}

const db = new Database(dbPath);
console.log('Created DB at', dbPath);

// execute SQL (this creates table and inserts rows)
db.exec(sql);

console.log('Seed complete. Products inserted:');
const rows = db.prepare('SELECT id, title, price FROM products ORDER BY id').all();
console.table(rows);

db.close();
