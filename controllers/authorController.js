const db = require("../config/database");
const models = require("../models");
const Author = require("../models/author");

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error ",
        });
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const { first_name, last_name } = req.body; // Получаем данные из тела запроса

        // Создаем нового автора в базе данных
        const author = await Author.create({
            first_name: first_name,
            last_name: last_name,
        });

        res.status(201).json(author); // Отправляем успешный ответ с данными созданного автора
    } catch (error) {
        console.error("Ошибка при создании автора:", error);
        res.status(400).json({ message: error.message }); // Отправляем ошибку, если что-то пошло не так
    }
};
