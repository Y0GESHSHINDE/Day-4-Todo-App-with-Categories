const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authenticate = require('../middleware/authMiddleware');

// Create todo
router.post('/', authenticate, async (req, res) => {
  const { task, categoryId } = req.body;
  const userId = req.user.id;

  try {
    const todo = new Todo({ task, categoryId, userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Get all todos for user (optionally populate category)
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await Todo.find({ userId }).populate('categoryId', 'name');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Toggle isDone or update task
router.put('/:id', authenticate, async (req, res) => {
  const todoId = req.params.id;
  const { isDone, task } = req.body;
  const userId = req.user.id;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { $set: { isDone, task } },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete todo
router.delete('/:id', authenticate, async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user.id;

  try {
    await Todo.findOneAndDelete({ _id: todoId, userId });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
