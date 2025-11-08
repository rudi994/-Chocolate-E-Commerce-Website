// backend/add-product.js
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'data', 'products.db');
const db = new Database(dbPath);

const newProduct = {
  id: 'p16',
  title: 'New Bar',
  price: 399,
  image: '/assets/products/p16.jpeg',
  description: 'New product added via script'
};

const stmt = db.prepare('INSERT OR REPLACE INTO products (id, title, price, image, description) VALUES (@id, @title, @price, @image, @description)');
stmt.run(newProduct);

console.log('Inserted', newProduct.id);
db.close();
