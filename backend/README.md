Backend quick start:
1. cd backend
2. npm install
3. copy .env.example to .env (optional)
4. npm run dev   # uses nodemon, or `npm start` to run once

Endpoints:
GET  /api/products
POST /api/cart   { cartId, productId, qty }
GET  /api/cart?cartId=...
PUT  /api/cart   { cartId, productId, qty }
DELETE /api/cart/:productId   (body: { cartId })
POST /api/checkout  { cartId, name, email, items }
