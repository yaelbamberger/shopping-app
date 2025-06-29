import React from 'react';
import { useSelector } from 'react-redux';

const CartList = () => {
  const items = useSelector((state) => state.cart.items);

  const groupedItems = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div style={{ textAlign: 'right', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {Object.keys(groupedItems).map((category) => (
        <div
          key={category}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
            width: '220px',
            minHeight: '100px',
          }}
        >
          <h3
            style={{
              backgroundColor: '#2f68cb',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '8px',
              margin: 0,
              textAlign: 'center',
              fontSize: '1rem',
            }}
          >
            {category}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {groupedItems[category].map((item, index) => (
              <li key={index} style={{ marginBottom: '0.3rem' }}>
                {item.name} – {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  
};

export default CartList;
