const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Создать категорию
router.post("/", categoryController.createCategory);

// Получить все категории
router.get("/", categoryController.getAllCategories);

// Получить категорию по ID
router.get("/:id", categoryController.getCategoryById);

// Обновить категорию
router.put("/:id", categoryController.updateCategory);

// Удалить категорию
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
