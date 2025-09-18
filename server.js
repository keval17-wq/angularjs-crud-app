const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

let items = [];
let idCounter = 1;

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Add new item
app.post('/api/items', (req, res) => {
  const newItem = { id: idCounter++, name: req.body.name };
  items.push(newItem);
  res.json(newItem);
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});