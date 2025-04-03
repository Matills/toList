const express = require('express');
const { param, body } = require('express-validator');
const { shareList, getSharedWithMe, getSharedUsers, updatePermission, unshareList } = require('../controllers/sharedListController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post(
  '/:listId/share',
  authMiddleware,
  param('listId').isUUID().withMessage('El ID de la lista debe ser un UUID válido'),
  validateRequest([
    { name: 'userId', optional: false },
    { name: 'permission', optional: false }
  ]),
  body('permission').isIn(['view', 'edit']).withMessage('El permiso debe ser "view" o "edit"'),
  shareList
);

router.get(
  '/',
  authMiddleware,
  getSharedWithMe
);

router.get(
  '/:listId/shares',
  authMiddleware,
  param('listId').isUUID().withMessage('El ID de la lista debe ser un UUID válido'),
  getSharedUsers
);

router.put(
  '/:shareId',
  authMiddleware,
  param('shareId').isUUID().withMessage('El ID de compartición debe ser un UUID válido'),
  validateRequest([
    { name: 'permission', optional: false }
  ]),
  body('permission').isIn(['view', 'edit']).withMessage('El permiso debe ser "view" o "edit"'),
  updatePermission
);

router.delete(
  '/:shareId',
  authMiddleware,
  param('shareId').isUUID().withMessage('El ID de compartición debe ser un UUID válido'),
  unshareList
);

module.exports = router;