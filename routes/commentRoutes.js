const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post(
    "/books/:bookId/comments",
    /* #swagger.tags = ['Comments']
     #swagger.description = 'Создать комментарий к книге'
     #swagger.parameters['bookId'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             userId: 1,
             body: 'Комментарий к книге'
         }
     }
     #swagger.responses[201] = {
         description: 'Комментарий создан'
     }
  */
    commentController.createComment
);

router.get(
    "/books/:bookId/comments",
    /* #swagger.tags = ['Comments']
     #swagger.description = 'Получить все комментарии к книге'
     #swagger.parameters['bookId'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Список комментариев'
     }
  */
    commentController.getAllCommentsForBook
);

router.get(
    "/comments/:id",
    /* #swagger.tags = ['Comments']
     #swagger.description = 'Получить комментарий по ID'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Комментарий найден'
     }
  */
    commentController.getCommentById
);

router.put(
    "/comments/:id",
    /* #swagger.tags = ['Comments']
     #swagger.description = 'Обновить комментарий'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             body: 'Обновлённый текст',
             userId: 1
         }
     }
     #swagger.responses[200] = {
         description: 'Комментарий обновлен'
     }
  */
    commentController.updateComment
);

router.delete(
    "/comments/:id",
    /* #swagger.tags = ['Comments']
     #swagger.description = 'Удалить комментарий'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[204] = {
         description: 'Комментарий удален'
     }
  */
    commentController.deleteComment
);

module.exports = router;
