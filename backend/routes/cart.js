// backend/routes/cart.js
const express = require('express');
const router = express.Router();
const products = require('../data/mockProducts.json');
const { carts } = require('../cartStore');

function ensureCart(id) {
  if (!id) id = `cart_${Date.now()}`;
  if (!carts[id]) carts[id] = { items: [] };
  return { id, cart: carts[id] };
}

function calcTotals(cart) {
  const subtotal = (cart.items || []).reduce((s, it) => s + (Number(it.price || 0) * Number(it.qty || 0)), 0);
  return { subtotal, total: +subtotal.toFixed(2) };
}

// POST /api/cart  -> add item (creates cartId when missing)
router.post('/', (req, res) => {
  const { cartId: incomingCartId, productId, qty } = req.body || {};
  if (!productId) return res.status(400).json({ error: 'productId required' });

  const product = products.find(p => String(p.id) === String(productId));
  if (!product) return res.status(404).json({ error: 'product not found' });

  const { id, cart } = ensureCart(incomingCartId);
  const existing = cart.items.find(i => String(i.id) === String(productId));
  if (existing) existing.qty = Math.max(1, existing.qty + (qty || 1));
  else cart.items.push({ id: product.id, title: product.title, price: product.price, qty: qty || 1, image: product.image });

  const totals = calcTotals(cart);
  return res.json({ cartId: id, items: cart.items, ...totals });
});

// GET /api/cart?cartId=...
router.get('/', (req, res) => {
  const cartId = req.query.cartId;
  if (!cartId) return res.status(400).json({ error: 'cartId required' });
  const cart = carts[cartId] || { items: [] };
  const totals = calcTotals(cart);
  res.json({ cartId, items: cart.items, ...totals });
});

// PUT /api/cart -> update qty
router.put('/', (req, res) => {
  const { cartId, productId, qty } = req.body || {};
  if (!cartId || !productId || qty == null) return res.status(400).json({ error: 'cartId, productId, qty required' });
  const cart = carts[cartId];
  if (!cart) return res.status(404).json({ error: 'cart not found' });
  const item = cart.items.find(i => String(i.id) === String(productId));
  if (!item) return res.status(404).json({ error: 'item not in cart' });
  item.qty = Math.max(0, Number(qty));
  cart.items = cart.items.filter(i => i.qty > 0);
  const totals = calcTotals(cart);
  res.json({ cartId, items: cart.items, ...totals });
});

// DELETE /api/cart/:productId  -> remove item
router.delete('/:productId', (req, res) => {
  const productId = req.params.productId;
  const { cartId } = req.body || {}; // axios.delete sends data in { data: {...} }
  if (!cartId) return res.status(400).json({ error: 'cartId required in body' });
  const cart = carts[cartId];
  if (!cart) return res.status(404).json({ error: 'cart not found' });
  cart.items = cart.items.filter(i => String(i.id) !== String(productId));
  const totals = calcTotals(cart);
  res.json({ cartId, items: cart.items, ...totals });
});

// POST /api/cart/clear -> clear cart
router.post('/clear', (req, res) => {
  const { cartId } = req.body || {};
  if (!cartId) return res.status(400).json({ error: 'cartId required' });
  carts[cartId] = { items: [] };
  res.json({ cartId, items: [], subtotal: 0, total: 0 });
});

module.exports = router;
