import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]); // קטגוריות מהשרת
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

 
  useEffect(() => {
    fetch('https://localhost:44334/api/categories') // שימי לב: להתאים לפורט שלך!
      .then(res => {
        if (!res.ok) {
          throw new Error('בעיה בטעינת קטגוריות');
        }
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => {
        console.error('שגיאה בקבלת קטגוריות:', err);
        setCategories([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !name || quantity <= 0) return;

    dispatch(addItem({ category, name, quantity }));
    setName('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'right', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>

        <div>
          <label>בחר קטגוריה</label><br />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '0.5rem', width: '150px' }}
            required
          >
            <option value="">בחר</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>שם המוצר</label><br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '0.5rem', width: '150px' }}
            required
          />
        </div>

        <div>
          <label>כמות</label><br />
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ padding: '0.5rem', width: '70px' }}
            required
          />
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            style={{ padding: '0.5rem 1rem', backgroundColor: '#2f68cb', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            הוסף לסל
          </button>
        </div>

      </div>
    </form>
  );
};

export default AddProductForm;
