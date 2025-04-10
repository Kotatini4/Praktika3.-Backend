const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

router.post(
    "/authors",
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Создать нового автора'
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             first_name: 'Иван',
             last_name: 'Петров'
         }
     }
     #swagger.responses[201] = {
         description: 'Автор успешно создан'
     }
     #swagger.responses[400] = {
         description: 'Неверные данные'
     }
  */
    authorController.createAuthor
);

router.get(
    "/authors",
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Получить всех авторов'
     #swagger.responses[200] = {
         description: 'Список авторов'
     }
  */
    authorController.getAllAuthors
);

router.put(
    "/authors/:id",
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Обновить автора по ID'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             first_name: 'Иван',
             last_name: 'Петров'
         }
     }
     #swagger.responses[200] = {
         description: 'Автор обновлён'
     }
     #swagger.responses[404] = {
         description: 'Автор не найден'
     }
  */
    authorController.updateAuthor
);

module.exports = router;
