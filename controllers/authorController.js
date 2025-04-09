const db = require("../config/database");
const Author = require("../models/author");

exports.createAuthor = async (req, res) => {
    const { first_name, last_name } = req.body;

    // Валидация входных данных
    if (!first_name || !last_name) {
        return res.status(400).json({
            success: false,
            message: "Имя и фамилия автора обязательны для заполнения",
        });
    }

    try {
        // Проверка на существующего автора
        const existingAuthor = await Author.findOne({
            where: {
                first_name: first_name,
                last_name: last_name,
            },
        });

        if (existingAuthor) {
            return res.status(409).json({
                success: false,
                message: "Автор с таким именем и фамилией уже существует",
                author: existingAuthor,
            });
        }

        // Создание нового автора
        const newAuthor = await Author.create({
            first_name: first_name,
            last_name: last_name,
            last_update: new Date(),
        });

        return res.status(201).json({
            success: true,
            message: "Автор успешно создан",
            author: newAuthor,
        });
    } catch (error) {
        console.error("Ошибка при создании автора:", error);
        return res.status(500).json({
            success: false,
            message: "Произошла ошибка при создании автора",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        console.error("Error fetching authors:", error);
        res.status(500).json({
            message: "Error fetching authors",
            error: error.message,
        });
    }
};
