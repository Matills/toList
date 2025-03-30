const { body, validationResult } = require('express-validator');

const validateRequest = (fields) => {
  return [
    ...fields.map((field) => {
      switch (field.name) {
        case 'name':
          return body('name').notEmpty().withMessage('El nombre es obligatorio');
        case 'email':
          return body('email').isEmail().withMessage('El correo no es válido');
        case 'password':
          return body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres');
        case 'description':
          return body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres');
        default:
          throw new Error(`Campo no soportado para validación: ${field.name}`);
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = { validateRequest };