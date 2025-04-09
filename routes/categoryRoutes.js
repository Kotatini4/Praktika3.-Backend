const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Создать новую категорию
router.post("/categories", categoryController.createCategory); // <--- Вот этот маршрут важен

// Получить все категории
router.get("/categories", categoryController.getAllCategories);

// Получить категорию по ID
router.get("/categories/:id", categoryController.getCategoryById);

// Обновить информацию о категории
router.put("/categories/:id", categoryController.updateCategory);

// Удалить категорию
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;
