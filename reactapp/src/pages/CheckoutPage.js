import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, address, email } = formData;
    if (!firstName || !lastName || !address || !email) {
      alert('אנא מלא/י את כל השדות החובה');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const { id } = await response.json();
      alert(`ההזמנה נשלחה בהצלחה! (ID: ${id})`);
      dispatch(clearCart());
      setFormData({ firstName: '', lastName: '', address: '', email: '' });
      navigate('/');
    } catch (err) {
      console.error('Error submitting order:', err);
      alert('אירעה שגיאה בשליחת ההזמנה. אנא נסי שוב.');
    }
  };

  if (items.length === 0) {
    return <p style={{ direction: 'rtl', textAlign: 'right' }}>אין מוצרים להזמנה. אנא חזר/י לעמוד הקניות.</p>;
  }

  return (
    <div style={{ direction: 'rtl', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2f68cb' }}>סיכום ההזמנה</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          שם פרטי:
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          שם משפחה:
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          כתובת מלאה:
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          מייל:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <h3>מוצרים בהזמנה:</h3>
        <ul style={{ background: '#f5f5f5', borderRadius: '8px', padding: '1rem' }}>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              {item.name} ({item.category}) - כמות: {item.quantity}
            </li>
          ))}
        </ul>

        <button type="submit" style={buttonStyle}>אשר הזמנה</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginTop: '0.25rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.75rem',
  backgroundColor: '#2f68cb',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default CheckoutPage;
