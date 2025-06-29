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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, items })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

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
    return <p>אין מוצרים להזמנה. אנא חזר/י לעמוד הקניות.</p>;
  }

  return (
    <div>
      <h1>סיכום ההזמנה</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>שם פרטי:</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>שם משפחה:</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>כתובת מלאה:</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>מייל:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <h3>מוצרים בהזמנה:</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} ({item.category}) - כמות: {item.quantity}
            </li>
          ))}
        </ul>

        <button type="submit">אשר הזמנה</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
