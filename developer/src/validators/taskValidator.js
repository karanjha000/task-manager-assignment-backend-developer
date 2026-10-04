const { body, param, query } = require('express-validator');

const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('dueDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Due date must be a valid ISO 8601 date format'),
];

const updateTaskValidation = [
  param('id').isMongoId().withMessage('Invalid Task ID format'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('dueDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Due date must be a valid ISO 8601 date format'),
];

const taskIdValidation = [
  param('id').isMongoId().withMessage('Invalid Task ID format'),
];

const getTasksValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status filter must be Pending, In Progress, or Completed'),
  query('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority filter must be Low, Medium, or High'),
];

module.exports = {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
  getTasksValidation,
};
