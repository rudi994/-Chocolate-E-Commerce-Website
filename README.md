🍫Chocolate E-Commerce Store
Cocoa & Charm Chocolates🍫


A modern full-stack chocolate shopping website featuring product listings, cart, and checkout — built with React, Node.js, Express, and SQLite.

🌟 Features
🖥 Frontend (React)🍬

Browse featured products with rich visuals

Add/remove items from cart with real-time updates

Live product search

Checkout form with dynamic total calculation

Toast messages for add/remove actions

⚙️ Backend (Express + SQLite)

REST API serving product catalog

In-memory + SQLite hybrid cart management

Checkout endpoint with order summary & receipt

No external DB setup — portable .db file

Modular architecture (routes/, context/, data/)

🚀 Setup Guide
🧩 Prerequisites

Ensure you have installed:
Node.js
 (v20 or higher)
SQLite3 CLI
Git

🔗 API Overview
Endpoint	Method	Description
/api/products	GET	Returns all products
/api/products/:id	GET	Returns single product by ID
/api/cart	POST	Add product to cart
/api/cart/clear	POST	Clear specific cart
/api/checkout	POST	Checkout with user details and get receipt


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
<img width="1896" height="864" alt="image" src="https://github.com/user-attachments/assets/875367ff-29a4-4e1c-ad15-e55e17f16a27" />

<img width="1919" height="873" alt="image" src="https://github.com/user-attachments/assets/659bf603-cc76-4808-823c-dc33ed97f08d" />

<img width="1918" height="868" alt="image" src="https://github.com/user-attachments/assets/5207741a-369e-48ec-be0c-03c84f3569e8" />

<img width="541" height="469" alt="image" src="https://github.com/user-attachments/assets/bb2b05f6-a294-4d00-9fc3-ea9a2f0eafc6" />





