const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Book = db.define(
    "book",
    {
        bookId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "book_id",
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        publicationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "publication_date",
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "authors",
                key: "author_id",
            },
            field: "author_id",
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categories",
                key: "category_id",
            },
            field: "category_id",
        },
        lastUpdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            field: "last_update",
        },
    },
    {
        timestamps: false,
        schema: "books", // только если действительно нужна схема
        tableName: "books",
        indexes: [
            {
                name: "idx_book_title",
                using: "BTREE",
                fields: [{ name: "title" }], // лучше ссылаться на поле модели, а не таблицы
            },
        ],
    }
);

module.exports = Book;
