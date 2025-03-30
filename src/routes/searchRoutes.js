const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { searchItems, getItemDetails } = require("../controllers/searchController");

const router = express.Router();

router.get("/search", authMiddleware, searchItems);
router.get("/details/:type/:id", authMiddleware,  getItemDetails);

module.exports = router;