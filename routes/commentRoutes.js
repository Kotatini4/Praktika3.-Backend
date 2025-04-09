const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
console.log("commentController:", commentController);

// POST — создать новый комментарий для конкретной книги (авторизация временно отключена)
router.post("/books/:bookId/comments", commentController.createComment);

// GET — получить все комментарии для конкретной книги
router.get("/books/:bookId/comments", commentController.getAllCommentsForBook);

// GET — получить комментарий по ID
router.get("/comments/:id", commentController.getCommentById);

// PUT — обновить комментарий по ID (авторизация временно отключена)
router.put("/comments/:id", commentController.updateComment);

// DELETE — удалить комментарий по ID (авторизация временно отключена)
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;
