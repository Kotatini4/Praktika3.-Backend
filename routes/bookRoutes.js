// routes/bookRoutes.js

const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Определяем маршруты для книг
router.get("/books", bookController.getAllBooks);
router.post("/books", bookController.createBook);

// Добавьте другие маршруты для книг (например, /books/:id для получения, обновления, удаления)

module.exports = router;
