const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createList, getLists, updateList, deleteList } = require("../controllers/listController");

const router = express.Router();

router.post("/", authMiddleware, createList);
router.get("/", authMiddleware, getLists);
router.put("/:id", authMiddleware, updateList);
router.delete("/:id", authMiddleware, deleteList);

module.exports = router;