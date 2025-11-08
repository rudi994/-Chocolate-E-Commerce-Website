
import React, { createContext, useEffect, useState } from 'react';
import API from '../api/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(() => localStorage.getItem('cartId') || '');
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, total: 0 });

  useEffect(() => {
    if (cartId) localStorage.setItem('cartId', cartId);
  }, [cartId]);

  async function fetchCart() {
    if (!cartId) return;
    try {
      const res = await API.get('/cart', { params: { cartId } });
      setItems(res.data.items || []);
      setTotals({ subtotal: res.data.subtotal || 0, total: res.data.total || 0 });
    } catch (err) {
      console.error('fetchCart error', err?.response || err);
    }
  }

  useEffect(() => { fetchCart(); }, [cartId]);

  async function addToCart(productId, qty = 1) {
    try {
      const res = await API.post('/cart', { cartId: cartId || undefined, productId, qty });
      if (res.data?.cartId) setCartId(res.data.cartId);
      setItems(res.data.items || []);
      setTotals({ subtotal: res.data.subtotal || 0, total: res.data.total || 0 });
      return res.data;
    } catch (err) {
      console.error('addToCart error', err?.response || err);
      throw err;
    }
  }

  async function updateQty(productId, qty) {
    if (!cartId) return;
    try {
      const res = await API.put('/cart', { cartId, productId, qty });
      setItems(res.data.items || []);
      setTotals({ subtotal: res.data.subtotal || 0, total: res.data.total || 0 });
      return res.data;
    } catch (err) {
      console.error('updateQty error', err?.response || err);
      throw err;
    }
  }

  async function removeFromCart(productId) {
    if (!cartId) {
      console.warn('removeFromCart: no cartId');
      return;
    }
    try {
      const res = await API.delete(`/cart/${productId}`, { data: { cartId } });
      setItems(res.data.items || []);
      setTotals({ subtotal: res.data.subtotal || 0, total: res.data.total || 0 });
      return res.data;
    } catch (err) {
      console.error('removeFromCart error', err?.response || err);
      throw err;
    }
  }

  async function clearCart() {
    if (!cartId) return;
    try {
      const res = await API.post('/cart/clear', { cartId });
      setItems([]);
      setTotals({ subtotal: 0, total: 0 });
      return res.data;
    } catch (err) {
      console.error('clearCart error', err?.response || err);
      throw err;
    }
  }

  async function checkout(payload = {}) {
    try {
      const res = await API.post('/checkout', { cartId, ...payload });
      // server returns receipt and ok; clear frontend cart on success
      if (res.data?.ok) {
        setItems([]);
        setTotals({ subtotal: 0, total: 0 });
        localStorage.removeItem('cartId');
        setCartId('');
      }
      return res.data;
    } catch (err) {
      console.error('checkout error', err?.response || err);
      throw err;
    }
  }

  return (
    <CartContext.Provider value={{
  cartId, items, totals,
  fetchCart, addToCart, updateQty, removeFromCart, clearCart, checkout,
  clearLocalCart, clearCartLocal: clearLocalCart
}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
