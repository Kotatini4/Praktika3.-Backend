const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define(
    "user",
    {
        userId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "user_id",
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "password_hash",
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "roles",
                key: "role_id",
            },
            field: "role_id",
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "last_login",
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
        tableName: "users",
        indexes: [
            {
                name: "idx_user_username",
                using: "BTREE",
                fields: [{ name: "username" }],
            },
            {
                name: "idx_user_email",
                using: "BTREE",
                fields: [{ name: "email" }],
            },
        ],
    }
);

module.exports = User;
