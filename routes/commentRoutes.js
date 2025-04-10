const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Комментарии к книгам
 */

/**
 * @swagger
 * /api/books/{bookId}/comments:
 *   post:
 *     summary: Создать комментарий к книге
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Комментарий создан
 */
router.post("/api/books/:bookId/comments", commentController.createComment);

/**
 * @swagger
 * /api/books/{bookId}/comments:
 *   get:
 *     summary: Получить все комментарии к книге
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список комментариев
 */
router.get(
    "/api/books/:bookId/comments",
    commentController.getAllCommentsForBook
);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Получить комментарий по ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Комментарий найден
 */
router.get("/api/comments/:id", commentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Обновить комментарий
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Комментарий обновлен
 */
router.put("/api/comments/:id", commentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Удалить комментарий
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Комментарий удален
 */
router.delete("/api/comments/:id", commentController.deleteComment);

module.exports = router;
