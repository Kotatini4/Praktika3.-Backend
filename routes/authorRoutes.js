const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// Создание нового автора
router.post("/", authorController.createAuthor);

// Получение всех авторов
router.get("/", authorController.getAllAuthors);

module.exports = router;
