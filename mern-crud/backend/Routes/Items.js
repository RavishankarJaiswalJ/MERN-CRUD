const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create
router.post('/', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  const saved = await newItem.save();
  res.json(saved);
});

// Read All
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Update
router.put('/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(updatedItem);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
