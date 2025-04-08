const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Comment = db.define(
    "comment",
    {
        commentId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "comment_id",
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id",
            },
            field: "user_id",
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "books",
                key: "book_id",
            },
            field: "book_id",
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            field: "created_at",
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
        tableName: "comments",
        indexes: [
            {
                name: "idx_comment_user",
                using: "BTREE",
                fields: [{ name: "user_id" }],
            },
            {
                name: "idx_comment_book",
                using: "BTREE",
                fields: [{ name: "book_id" }],
            },
        ],
    }
);

module.exports = Comment;
