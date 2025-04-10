const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Комментарии к книгам
 */

router.post("/books/:bookId/comments", commentController.createComment);

router.get("/books/:bookId/comments", commentController.getAllCommentsForBook);

router.get("/comments/:id", commentController.getCommentById);

router.put("/comments/:id", commentController.updateComment);

router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;
