const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use /tmp for Vercel compliance, or fallback to the local directory for your laptop
const DATA_DIR = process.env.NODE_ENV === 'production' ? '/tmp' : __dirname;
const DB_FILE = path.join(DATA_DIR, 'tasks-db.json');

// Helper function: Read data securely from the JSON file
function readDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      // If file doesn't exist, initialize with a clean empty database layout
      const initialData = { tasks: [], idCounter: 1 };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const fileContent = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { tasks: [], idCounter: 1 };
  }
}

// Helper function: Save data securely to the JSON file
function writeDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET: Fetch all persistent tasks
app.get('/tasks', (req, res) => {
  const db = readDatabase();
  res.status(200).json(db.tasks);
});

// POST: Add a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ detail: "Task title cannot be empty" });
  }

  const db = readDatabase();
  const newTask = {
    id: db.idCounter,
    title: title.trim(),
    completed: false
  };

  db.tasks.push(newTask);
  db.idCounter++;
  writeDatabase(db);

  res.status(201).json(newTask);
});

// PUT: Update task title or toggled complete/incomplete check status
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { title, completed } = req.body;

  const db = readDatabase();
  const taskIndex = db.tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ detail: "Task not found" });
  }

  // Update whatever fields are passed into the request
  if (title !== undefined) db.tasks[taskIndex].title = title.trim();
  if (completed !== undefined) db.tasks[taskIndex].completed = completed;

  writeDatabase(db);
  res.status(200).json(db.tasks[taskIndex]);
});

// DELETE: Erase a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const db = readDatabase();
  const taskExists = db.tasks.some(t => t.id === taskId);

  if (!taskExists) {
    return res.status(404).json({ detail: "Task not found" });
  }

  db.tasks = db.tasks.filter(t => t.id !== taskId);
  writeDatabase(db);
  res.status(204).send();
});

if (process.env.NODE_ENV !== 'production' && require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

module.exports = app;
