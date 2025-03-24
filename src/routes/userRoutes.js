const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");
const { createUser, loginUser, getProfile } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  validateRequest([{ name: "name" }, { name: "email" }, { name: "password" }]),
  createUser
);
router.post(
  "/login",
  validateRequest([{ name: "email" }, { name: "password" }]),
  loginUser
);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;