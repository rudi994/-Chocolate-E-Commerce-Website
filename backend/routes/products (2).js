// backend/routes/products.js
const express = require('express');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const dbPath = path.join(__dirname, '..', 'data', 'products.db');

// small helper to run sqlite3 and get JSON
function runSqliteJson(sql) {
  return new Promise((resolve, reject) => {
    // use the sqlite3 CLI with -json output (available in modern sqlite3)
    const sqliteExe = 'sqlite3';
    const args = ['-json', dbPath, sql];

    execFile(sqliteExe, args, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        // include stderr text so it's easier to debug
        return reject(new Error(`${err.message}\n${stderr || ''}`));
      }
      try {
        const parsed = stdout.trim() ? JSON.parse(stdout) : [];
        resolve(parsed);
      } catch (parseErr) {
        // if JSON parse fails, return raw stdout for debugging
        return reject(new Error('Failed to parse sqlite3 output: ' + parseErr.message + '\nOutput:\n' + stdout));
      }
    });
  });
}

// GET /api/products
router.get('/', async (req, res) => {
  try {
    if (!fs.existsSync(dbPath)) return res.status(500).json({ error: 'products.db not found. Run seed.' });
    const rows = await runSqliteJson('SELECT id, title AS name, price, image, description FROM products ORDER BY id;');
    return res.json(rows);
  } catch (err) {
    console.error('products list error', err);
    return res.status(500).json({ error: 'Failed to read products', details: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    if (!fs.existsSync(dbPath)) return res.status(500).json({ error: 'products.db not found. Run seed.' });
    // sanitise id by allowing only [a-zA-Z0-9_-]
    const id = String(req.params.id || '').trim();
    if (!/^[\w-]+$/.test(id)) return res.status(400).json({ error: 'invalid id' });

    const sql = `SELECT id, title AS name, price, image, description FROM products WHERE id='${id}' LIMIT 1;`;
    const rows = await runSqliteJson(sql);
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'not found' });
    return res.json(rows[0]);
  } catch (err) {
    console.error('product/:id error', err);
    return res.status(500).json({ error: 'Failed to read product', details: err.message });
  }
});

module.exports = router;
