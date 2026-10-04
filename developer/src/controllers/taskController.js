const Task = require('../models/Task');

// Create task
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: 'Task created',
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// Get tasks with optional search, status/priority filter & pagination
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;

    // scope query to current authenticated user
    const filter = { user: req.user._id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNumber = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * pageSize;

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / pageSize);

    res.json({
      success: true,
      totalTasks,
      totalPages,
      currentPage: pageNumber,
      limit: pageSize,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// Get single task by ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // verify ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not own this task',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// Update task by ID
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // verify ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not own this task',
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    const updatedTask = await task.save();

    res.json({
      success: true,
      message: 'Task updated',
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

// Delete task by ID
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // verify ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not own this task',
      });
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
