require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');      
const checkoutRoute = require('./routes/checkout');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);       
app.use('/api/checkout', checkoutRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
