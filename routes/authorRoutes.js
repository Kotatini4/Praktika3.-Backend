const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Управление авторами
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Создать нового автора
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Автор успешно создан
 *       400:
 *         description: Неверные данные
 */
router.post("/api/authors", authorController.createAuthor);

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Получить всех авторов
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Список авторов
 */
router.get("/api/authors", authorController.getAllAuthors);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Обновить автора по ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Автор обновлён
 *       404:
 *         description: Автор не найден
 */
router.put("/api/authors/:id", authorController.updateAuthor);

module.exports = router;
