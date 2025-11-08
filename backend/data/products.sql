-- backend/data/products.sql
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT,
  description TEXT
);

INSERT OR REPLACE INTO products (id, title, price, image, description) VALUES
('p1',  'Signature Truffles',        1299.00, '/assets/products/p1.jpeg', 'A curated box of handcrafted truffles.'),
('p2',  'Dark Chocolate Bar',         499.00, '/assets/products/p2.jpeg', '72% cocoa dark chocolate bar.'),
('p3',  'Milk Chocolate Squares',     599.00, '/assets/products/p3.jpeg', 'Silky milk chocolate squares.'),
('p4',  'Assorted Collection',       2499.00, '/assets/products/p4.jpeg', 'Large assorted gift box.'),
('p5',  'Gift Tin',                   799.00, '/assets/products/p5.jpeg', 'Elegant tin with bite-sized chocolates.'),
('p6',  'Hazelnut Praline Box',       899.00, '/assets/products/p6.jpeg', 'Crunchy hazelnut praline selection.'),
('p7',  'Sea Salt Caramels',          349.00, '/assets/products/p7.jpeg', 'Soft caramels with sea salt.'),
('p8',  'Chocolate Bark',             249.00, '/assets/products/p8.jpeg', 'Thin crunchy chocolate bark.'),
('p9',  'Mini Truffle Pack',          299.00, '/assets/products/p9.jpeg', 'Personal sized truffle pack.'),
('p10', 'Dark Ganache Collection',   1099.00, '/assets/products/p10.jpeg', 'Rich dark ganache flavours.'),
('p11', 'Chocolate Covered Nuts',     399.00, '/assets/products/p11.jpeg', 'Roasted nuts covered in chocolate.'),
('p12', 'Fruit & Nut Bar',            299.00, '/assets/products/p12.jpeg', 'Fruit and nut studded bar.'),
('p13', 'Assorted Miniatures',        699.00, '/assets/products/p13.jpeg', 'Miniature bites in mixed flavours.'),
('p14', 'Luxury Gift Box',           3299.00, '/assets/products/p14.jpeg', 'Premium selection for gifting.'),
('p15', 'Single-Origin Bar',          549.00, '/assets/products/p15.jpeg', 'A single-origin chocolate experience.');

COMMIT;
