const db = require("../config/database");

// Импорт моделей
const Author = require("./author")(db);
const Role = require("./role")(db);
const User = require("./user")(db);
const Book = require("./book")(db);
const Category = require("./category")(db);
const Comment = require("./comment")(db);

// Установка ассоциаций
User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

// Экспорт моделей
const models = {
    Author,
    Role,
    User,
    Book,
    Category,
    Comment,
};

module.exports = models;

// // 1. Author ↔ Book (many-to-many через таблицу book_author)
// Author.belongsToMany(Book, {
//     through: "book_author",
//     foreignKey: "author_id",
//     otherKey: "book_id",
//     as: "books",
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
//     hooks: true,
// });

// Book.belongsToMany(Author, {
//     through: "book_author",
//     foreignKey: "book_id",
//     otherKey: "author_id",
//     as: "authors",
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
// });

// // 2. Category ↔ Book (one-to-many)
// Category.hasMany(Book, {
//     foreignKey: {
//         name: "category_id",
//         allowNull: false,
//     },
//     as: "books",
//     onDelete: "RESTRICT", // Нельзя удалить категорию с книгами
//     onUpdate: "CASCADE",
// });

// Book.belongsTo(Category, {
//     foreignKey: "category_id",
//     as: "category",
//     onDelete: "RESTRICT",
//     onUpdate: "CASCADE",
// });

// // 3. Role ↔ User (one-to-many)
// Role.hasMany(User, {
//     foreignKey: {
//         name: "role_id",
//         allowNull: false,
//     },
//     as: "users",
//     onDelete: "RESTRICT", // Нельзя удалить роль, если есть пользователи
//     onUpdate: "CASCADE",
// });

// User.belongsTo(Role, {
//     foreignKey: "role_id",
//     as: "role",
//     onDelete: "RESTRICT",
//     onUpdate: "CASCADE",
// });

// // 4. User ↔ Comment (one-to-many)
// User.hasMany(Comment, {
//     foreignKey: "user_id",
//     as: "comments",
//     onDelete: "SET NULL", // Комментарии остаются, но user_id = NULL
//     onUpdate: "CASCADE",
// });

// Comment.belongsTo(User, {
//     foreignKey: "user_id",
//     as: "user",
//     onDelete: "SET NULL",
//     onUpdate: "CASCADE",
// });

// // 5. Book ↔ Comment (one-to-many)
// Book.hasMany(Comment, {
//     foreignKey: "book_id",
//     as: "comments",
//     onDelete: "CASCADE", // Удаляем комментарии при удалении книги
//     onUpdate: "CASCADE",
// });

// Comment.belongsTo(Book, {
//     foreignKey: "book_id",
//     as: "book",
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
// });

// const models = {
//     Author: Author,
// };

// module.exports = models;
