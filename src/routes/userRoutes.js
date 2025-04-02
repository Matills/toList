const express = require("express");
const { param } = require('express-validator');
const authMiddleware = require("../middlewares/authMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");
const { createUser, loginUser, getProfile, deleteUser, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  validateRequest([
    { name: "name", optional: false },
    { name: "email", optional: false },
    { name: "password", optional: false },
  ]),
  createUser
);

router.post(
  "/login",
  validateRequest([
    { name: "email", optional: false },
    { name: "password", optional: false },
  ]),
  loginUser
);

router.put(
  '/:id',
  authMiddleware,
  param('id').isUUID().withMessage('El ID debe ser un UUID válido'),
  validateRequest([
    { name: "name", optional: true },
    { name: "email", optional: true },
    { name: "password", optional: true },
  ]),
  updateUser
);

router.get("/profile", authMiddleware, getProfile);

router.delete(
  '/:id',
  authMiddleware,
  param('id').isUUID().withMessage('El ID debe ser un UUID válido'),
  deleteUser
);

module.exports = router;