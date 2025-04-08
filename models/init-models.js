// models/index.js
const { Sequelize } = require("sequelize");
const config = require("../config/config.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        schema: dbConfig.schema,
        dialectOptions: dbConfig.dialectOptions,
        logging: dbConfig.logging,
    }
);

const Author = require("./author")(sequelize, Sequelize.DataTypes);

module.exports = {
    sequelize,
    Sequelize,
    Author,
};

// После определения всех моделей (Author, Book, Category, User, Comment, Roli)

// Author-Book many-to-many через таблицу book_author
Author.belongsToMany(Book, {
    through: "book_author",
    foreignKey: "author_id",
    otherKey: "book_id",
    onDelete: "CASCADE",
});

Book.belongsToMany(Author, {
    through: "book_author",
    foreignKey: "book_id",
    otherKey: "author_id",
    onDelete: "CASCADE",
});

// Book-Category one-to-many
Book.belongsTo(Category, {
    as: "category",
    foreignKey: "category_id",
});

Category.hasMany(Book, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
});

// User-Comment one-to-many
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    as: "user",
    foreignKey: "user_id",
});

// Book-Comment one-to-many
Book.hasMany(Comment, {
    as: "comments",
    foreignKey: "book_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(Book, {
    as: "book",
    foreignKey: "book_id",
});

// Role-User one-to-many
Role.hasMany(User, {
    foreignKey: "role_id",
    onDelete: "CASCADE",
});

User.belongsTo(Role, {
    as: "role",
    foreignKey: "role_id",
});
