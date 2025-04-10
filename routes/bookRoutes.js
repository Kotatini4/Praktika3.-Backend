const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get(
    "/books",
    /* #swagger.tags = ['Books']
     #swagger.description = 'Получить список книг'
     #swagger.responses[200] = {
         description: 'Список книг'
     }
  */
    bookController.getAllBooks
);

router.get(
    "/books/:id",
    /* #swagger.tags = ['Books']
     #swagger.description = 'Получить книгу по ID'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Книга найдена'
     }
     #swagger.responses[404] = {
         description: 'Книга не найдена'
     }
  */
    bookController.getBookById
);

router.post(
    "/books",
    /* #swagger.tags = ['Books']
     #swagger.description = 'Создать книгу'
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             book_title: 'Название книги',
             book_description: 'Описание книги',
             publication_year: 2024,
             category_id: 1,
             author_ids: [1, 2]
         }
     }
     #swagger.responses[201] = {
         description: 'Книга создана'
     }
     #swagger.responses[400] = {
         description: 'Ошибка ввода'
     }
  */
    bookController.createBook
);

router.put(
    "/books/:id",
    /* #swagger.tags = ['Books']
     #swagger.description = 'Обновить книгу по ID'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             book_title: 'Новое название',
             book_description: 'Новое описание',
             publication_year: 2025,
             category_id: 2,
             author_ids: [3]
         }
     }
     #swagger.responses[200] = {
         description: 'Книга обновлена'
     }
     #swagger.responses[404] = {
         description: 'Книга не найдена'
     }
  */
    bookController.updateBook
);

router.delete(
    "/books/:id",
    /* #swagger.tags = ['Books']
     #swagger.description = 'Удалить книгу'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Книга удалена'
     }
     #swagger.responses[404] = {
         description: 'Книга не найдена'
     }
  */
    bookController.deleteBook
);

module.exports = router;
