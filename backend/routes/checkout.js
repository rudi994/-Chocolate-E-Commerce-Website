
const express = require('express');
const router = express.Router();
const { carts } = require('../cartStore');

function calcTotals(cart) {
  const subtotal = (cart.items || []).reduce((s, it) => s + (Number(it.price || 0) * Number(it.qty || 0)), 0);
  return { subtotal, total: +subtotal.toFixed(2) };
}

router.post('/', (req, res) => {
  const { cartId, name, email } = req.body || {};
  if (!cartId) return res.status(400).json({ error: 'cartId required' });

  const cart = carts[cartId];
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return res.status(400).json({ error: 'cart empty or not found' });
  }

  const totals = calcTotals(cart);
  const receipt = {
    id: `r_${Date.now()}`,
    cartId,
    name: name || 'Guest',
    email: email || '',
    items: cart.items,
    subtotal: totals.subtotal,
    total: totals.total,
    timestamp: new Date().toISOString()
  };

  // clear server cart
  delete carts[cartId];

  res.json({ ok: true, receipt });
});

module.exports = router;
