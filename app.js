const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Tell Express to serve the web UI dashboard automatically
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store now starts completely empty, waiting for real user input
let database = [];
let idCounter = 1;

// GET: Fetch user-created tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(database);
});

// POST: Create a task from the user's interface input
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ detail: "Task title cannot be empty" });
  }

  const newTask = {
    id: idCounter++,
    title: title.trim(),
    completed: false
  };

  database.push(newTask);
  res.status(201).json(newTask);
});

// DELETE: Remove a user task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskExists = database.some(t => t.id === taskId);

  if (!taskExists) {
    return res.status(404).json({ detail: "Task not found" });
  }

  database = database.filter(t => t.id !== taskId);
  res.status(204).send();
});

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

module.exports = app;
