const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Todo = require('../models/Todo');
const authenticate = require('../middleware/authMiddleware');

// Create new category
router.post('/', authenticate, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const category = new Category({ name, userId });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Get all categories for user
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const categories = await Category.find({ userId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Delete a category and its todos
router.delete('/:id', authenticate, async (req, res) => {
  const categoryId = req.params.id;
  const userId = req.user.id;

  try {
    await Category.findOneAndDelete({ _id: categoryId, userId });
    await Todo.deleteMany({ categoryId, userId });

    res.json({ message: 'Category and related todos deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
