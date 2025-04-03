const express = require("express");
const userRoutes = require("./userRoutes");
const listRoutes = require("./listRoutes");
const searchRoutes = require("./searchRoutes");
const listItemRoutes = require("./listItemRoutes");
const sharedListRoutes = require('./sharedListRoutes');

const router = express.Router();

router.use("/users", userRoutes);
router.use("/lists", listRoutes);
router.use("/items", searchRoutes);
router.use("/listsItems", listItemRoutes);
router.use('/sharedLists', sharedListRoutes);

module.exports = router;