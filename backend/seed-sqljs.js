

const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function seed() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const sqlPath = path.join(dataDir, 'products.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('Missing products.sql at', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  const SQL = await initSqlJs({ locateFile: file => path.join(__dirname, 'node_modules', 'sql.js', file) });

  // create empty DB
  const db = new SQL.Database();

  // Exec the SQL (create table + inserts)
  db.exec(sql);

  // Export to binary array
  const binaryArray = db.export();

  // Write to file
  const outPath = path.join(dataDir, 'products.db');
  fs.writeFileSync(outPath, Buffer.from(binaryArray));
  console.log('Wrote DB to', outPath);

  // For debug: read first 5 rows
  const res = db.exec("SELECT id, title, price FROM products ORDER BY id LIMIT 15");
  if (res.length > 0) {
    const columns = res[0].columns;
    const values = res[0].values;
    console.log('Products in DB:');
    console.table(values.map(r => {
      const obj = {};
      columns.forEach((c,i)=> obj[c] = r[i]);
      return obj;
    }));
  } else {
    console.log('No rows returned; verify products.sql inserts exist.');
  }

  db.close();
}

seed().catch(err => { console.error(err); process.exit(1); });
