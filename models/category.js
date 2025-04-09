const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Category = db.define(
    "category",
    {
        categoryId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "category_id",
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        tableName: "categories",
        indexes: [
            {
                name: "idx_category_name",
                using: "BTREE",
                fields: [{ name: "name" }],
            },
        ],
    }
);

module.exports = Category;
