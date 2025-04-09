// controllers/bookController.js

const { Book, Author, Category } = require("../models"); // Импортируем модели

// Пример обработчика для получения всех книг
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                { model: Author, as: "authors" },
                { model: Category, as: "category" },
            ],
        });
        res.status(200).json(books);
    } catch (error) {
        console.error("Ошибка при получении книг:", error);
        res.status(500).json({ message: "Не удалось получить список книг" });
    }
};

// Пример обработчика для создания новой книги
exports.createBook = async (req, res) => {
    try {
        const { book_title, book_description, publication_year, category_id } =
            req.body;
        const newBook = await Book.create({
            book_title,
            book_description,
            publication_year,
            category_id,
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Ошибка при создании книги:", error);
        res.status(400).json({ message: error.message });
    }
};

// Добавьте другие обработчики для книг (получение по ID, обновление, удаление и т.д.)
