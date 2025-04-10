const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Управление книгами
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Получить список книг
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Список книг
 */
router.get("/api/books", bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Получить книгу по ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Книга найдена
 *       404:
 *         description: Книга не найдена
 */
router.get("/api/books/:id", bookController.getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Создать книгу
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_title:
 *                 type: string
 *               book_description:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               author_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Книга создана
 *       400:
 *         description: Ошибка ввода
 */
router.post("/api/books", bookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Обновить книгу по ID
 *     tags: [Books]
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
 *               book_title:
 *                 type: string
 *               book_description:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               author_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Книга обновлена
 *       404:
 *         description: Книга не найдена
 */
router.put("/api/books/:id", bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Удалить книгу
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Книга удалена
 *       404:
 *         description: Книга не найдена
 */
router.delete("/api/books/:id", bookController.deleteBook);

module.exports = router;
