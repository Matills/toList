const express = require('express');
const { param, body } = require('express-validator');
const { addItem, getItems, updateItem, removeItem } = require('../controllers/listItemController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post(
  '/:listId/items',
  authMiddleware,
  param('listId').isUUID().withMessage('El ID de la lista debe ser un UUID válido'),
  validateRequest([
    { name: 'itemType', optional: false },
    { name: 'itemId', optional: false },
  ]),
  addItem
);

router.get(
  '/:listId/items',
  authMiddleware,
  param('listId').isUUID().withMessage('El ID de la lista debe ser un UUID válido'),
  getItems
);

router.delete(
  '/:listId/items/:itemId',
  authMiddleware,
  param('listId').isUUID().withMessage('El ID de la lista debe ser un UUID válido'),
  param('itemId').isUUID().withMessage('El ID del item debe ser un UUID válido'),
  removeItem
);

module.exports = router;