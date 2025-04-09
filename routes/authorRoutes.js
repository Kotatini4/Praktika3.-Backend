const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

router.get("/", authorController.getAllAuthors);
router.post("/", authorController.createAuthor);
// Добавьте другие маршруты

module.exports = router;
