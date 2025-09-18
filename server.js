const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client'));

let items = [
  { id: 1, name: "Sample Item 1" },
  { id: 2, name: "Sample Item 2" }
];
let nextId = 3;

// CRUD endpoints
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  let item = items.find(i => i.id === id);
  if (item) {
    item.name = name;
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
