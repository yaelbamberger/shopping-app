// index.js

// 0. Polyfill ל־DOMException (דרוש ל-undici)
global.DOMException = global.DOMException || class DOMException extends Error {
  constructor(message, name) {
    super(message);
    this.name = name || 'DOMException';
  }
};

// 1. Polyfill ל־ReadableStream ו־Blob
const { ReadableStream } = require('stream/web');
global.ReadableStream = ReadableStream;

const { Blob } = require('buffer');
global.Blob = Blob;

// 2. require רגיל של שאר המודולים
const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

// 3. יצירת client ל־Elasticsearch
const es = new Client({ node: 'http://localhost:9200' });

const app = express();
app.use(cors());
app.use(express.json());

// 4. נתיב POST לשמירת הזמנה
app.post('/api/orders', async (req, res) => {
  try {
    const order = { ...req.body, createdAt: new Date() };
    const result = await es.index({
      index: 'orders',
      document: order
    });
    res.status(201).json({ id: result._id });
  } catch (err) {
    console.error('Error indexing order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// 5. אופציונלי: GET לכל ההזמנות
app.get('/api/orders', async (req, res) => {
  try {
    const { hits } = await es.search({
      index: 'orders',
      size: 100,
      sort: [{ createdAt: { order: 'desc' } }]
    });
    const orders = hits.hits.map(hit => ({ id: hit._id, ...hit._source }));
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 6. הרצת השרת
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Orders API listening on http://localhost:${PORT}`);
});
