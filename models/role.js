const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Role = db.define(
    "role",
    {
        roleId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "role_id",
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
        tableName: "roles",
        indexes: [
            {
                name: "idx_role_name",
                using: "BTREE",
                fields: [{ name: "name" }],
            },
        ],
    }
);

module.exports = Role;
