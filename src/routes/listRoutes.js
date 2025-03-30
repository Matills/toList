const express = require('express');
const { createList, getLists, updateList, deleteList } = require('../controllers/listController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validateRequest([{ name: 'name' }, { name: 'description' }]),
  createList
);

router.put(
  '/:id',
  authMiddleware,
  validateRequest([{ name: 'name' }, { name: 'description' }]),
  updateList
);

router.get('/', authMiddleware, getLists);
router.delete('/:id', authMiddleware, deleteList);

module.exports = router;