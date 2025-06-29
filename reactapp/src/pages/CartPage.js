import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from '../components/AddProductForm';
import CartList from '../components/CartList';

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', direction: 'rtl' }}>
      <h2 style={{ marginBottom: '1rem' }}> רשימת קניות</h2>

      <AddProductForm />

      <div style={{ marginTop: '2rem' }}>
        <CartList />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/checkout')}
          style={{
            padding: '0.7rem 1.5rem',
            backgroundColor: '#2f68cb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          המשך להזמנה
        </button>
      </div>
    </div>
  );
};

export default CartPage;
