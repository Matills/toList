const express = require('express');
const { param } = require('express-validator');
const { createList, getLists, updateList, deleteList } = require('../controllers/listController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validateRequest([
    { name: 'name', optional: false },
    { name: 'description', optional: true },
  ]),
  createList
);

router.put(
  '/:id',
  authMiddleware,
  param('id').isUUID().withMessage('El ID debe ser un UUID válido'),
  validateRequest([
    { name: 'name', optional: true },
    { name: 'description', optional: true },
  ]),
  updateList
);

router.get('/', authMiddleware, getLists);

router.delete(
  '/:id',
  authMiddleware,
  param('id').isUUID().withMessage('El ID debe ser un UUID válido'),
  deleteList
);

module.exports = router;