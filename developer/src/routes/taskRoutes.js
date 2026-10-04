const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
  getTasksValidation,
} = require('../validators/taskValidator');

// All task routes require authentication
router.use(protect);

router
  .route('/')
  .post(createTaskValidation, validate, createTask)
  .get(getTasksValidation, validate, getTasks);

router
  .route('/:id')
  .get(taskIdValidation, validate, getTaskById)
  .put(updateTaskValidation, validate, updateTask)
  .delete(taskIdValidation, validate, deleteTask);

module.exports = router;
