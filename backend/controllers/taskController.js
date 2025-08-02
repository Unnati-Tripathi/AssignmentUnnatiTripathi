import Task from '../models/taskModel.js';

export const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const attachedDocuments = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    user: req.user.id,
    attachedDocuments,
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const { status, priority, sortBy } = req.query;

  const filter = { user: req.user.id };

  if (status) {
    filter.status = status;
  }
  if (priority) {
    filter.priority = priority;
  }

  let sortOptions = {};
  if (sortBy) {
    const parts = sortBy.split(':');
    sortOptions[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  } else {
    sortOptions = { createdAt: -1 };
  }

  const tasks = await Task.find(filter).sort(sortOptions);
  res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await task.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Task removed' });
};