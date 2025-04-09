const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Author = sequelize.define(
        "Author",
        {
            author_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            last_update: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
            tableName: "authors",
        }
    );

    return Author;
};
