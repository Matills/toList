const { body, validationResult } = require('express-validator');

const validateRequest = (fields) => {
  return [
    ...fields.map((field) => {
      const isOptional = field.optional || false;
      switch (field.name) {
        case 'name':
          return isOptional
            ? body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío')
            : body('name').notEmpty().withMessage('El nombre es obligatorio');
        case 'email':
          return isOptional
            ? body('email').optional().isEmail().withMessage('El correo no es válido')
            : body('email').isEmail().withMessage('El correo es obligatorio y debe ser válido');
        case 'password':
          return isOptional
            ? body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
            : body('password').isLength({ min: 6 }).withMessage('La contraseña es obligatoria y debe tener al menos 6 caracteres');
        case 'description':
          return body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres');
        case 'itemType':
          return isOptional
            ? body('itemType').optional().isIn(['movie', 'series', 'anime']).withMessage('El tipo de item debe ser "movie", "series" o "anime"')
            : body('itemType').isIn(['movie', 'series', 'anime']).withMessage('El tipo de item es obligatorio y debe ser "movie", "series" o "anime"');
        case 'itemId':
          return isOptional
            ? body('itemId').optional().isInt().withMessage('El ID del item debe ser un número entero')
            : body('itemId').isInt().withMessage('El ID del item es obligatorio y debe ser un número entero');
        case 'userId':
          return isOptional
            ? body('userId').optional().isUUID().withMessage('El ID de usuario debe ser un UUID válido')
            : body('userId').isUUID().withMessage('El ID de usuario es obligatorio y debe ser un UUID válido');
        case 'permission':
          return isOptional
            ? body('permission').optional().isIn(['view', 'edit']).withMessage('El permiso debe ser "view" o "edit"')
            : body('permission').isIn(['view', 'edit']).withMessage('El permiso es obligatorio y debe ser "view" o "edit"');
        case 'title':
          return body('title').optional().isLength({ max: 255 }).withMessage('El título no puede tener más de 255 caracteres');
        default:
          return body(field.name).custom(() => {
            throw new Error(`El campo ${field.name} no está soportado para validación`);
          });
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Errores de validación",
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};

module.exports = { validateRequest };