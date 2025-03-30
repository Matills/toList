const express = require("express");
const userRoutes = require("./userRoutes");
const listRoutes = require("./listRoutes");
const searchRoutes = require("./searchRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/lists", listRoutes);
router.use("/items", searchRoutes);

module.exports = router;