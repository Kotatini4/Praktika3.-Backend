const db = require("../config/database");
const { Book, Author, Category, Comment, User } = require("../models");

exports.createBook = async (req, res) => {
    try {
        const {
            book_title,
            book_description,
            publication_year,
            category_id,
            author_ids,
        } = req.body;

        // Валидация обязательных полей
        if (!book_title || !category_id) {
            return res.status(400).json({
                success: false,
                message: "Название книги и категория обязательны",
            });
        }

        // Проверка существования категории
        const categoryExists = await Category.findByPk(category_id);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Указанная категория не существует",
            });
        }

        // Создание книги
        const book = await Book.create({
            book_title,
            book_description,
            publication_year,
            category_id,
            last_update: new Date(),
        });

        // Добавление авторов (если указаны)
        if (author_ids && author_ids.length > 0) {
            // Проверка существования авторов
            const existingAuthors = await Author.findAll({
                where: { author_id: author_ids },
            });

            if (existingAuthors.length !== author_ids.length) {
                return res.status(400).json({
                    success: false,
                    message: "Один или несколько авторов не найдены",
                });
            }

            await book.setAuthors(author_ids);
        }

        // Получаем созданную книгу с полными данными
        const createdBook = await Book.findByPk(book.book_id, {
            include: [
                {
                    model: Author,
                    through: { attributes: [] }, // Скрываем промежуточную таблицу
                },
                {
                    model: Category,
                },
            ],
        });

        res.status(201).json({
            success: true,
            data: createdBook,
        });
    } catch (error) {
        console.error("Ошибка при создании книги:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при создании книги",
            error:
                process.env.NODE_ENV === "development"
                    ? {
                          message: error.message,
                          details: error.errors,
                      }
                    : undefined,
        });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Author,
                    through: { attributes: [] },
                },
                {
                    model: Category,
                },
            ],
            order: [["book_id", "ASC"]],
        });

        res.status(200).json({
            success: true,
            data: books,
        });
    } catch (error) {
        console.error("Ошибка при получении книг:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при получении списка книг",
        });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: [
                {
                    model: Author,
                    through: { attributes: [] },
                },
                {
                    model: Category,
                },
            ],
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Книга не найдена",
            });
        }

        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (error) {
        console.error("Ошибка при получении книги:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при получении книги",
        });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Книга не найдена",
            });
        }

        const {
            book_title,
            book_description,
            publication_year,
            category_id,
            author_ids,
        } = req.body;

        // Обновление полей книги
        await book.update({
            book_title: book_title || book.book_title,
            book_description: book_description || book.book_description,
            publication_year: publication_year || book.publication_year,
            category_id: category_id || book.category_id,
            last_update: new Date(),
        });

        // Обновление авторов (если указаны)
        if (author_ids) {
            const existingAuthors = await Author.findAll({
                where: { author_id: author_ids },
            });

            if (existingAuthors.length !== author_ids.length) {
                return res.status(400).json({
                    success: false,
                    message: "Один или несколько авторов не найдены",
                });
            }

            await book.setAuthors(author_ids);
        }

        // Получаем обновленную книгу с полными данными
        const updatedBook = await Book.findByPk(book.book_id, {
            include: [
                {
                    model: Author,
                    through: { attributes: [] },
                },
                {
                    model: Category,
                },
            ],
        });

        res.status(200).json({
            success: true,
            data: updatedBook,
        });
    } catch (error) {
        console.error("Ошибка при обновлении книги:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при обновлении книги",
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Книга не найдена",
            });
        }

        // Удаляем связи с авторами
        await book.setAuthors([]);

        // Удаляем саму книгу
        await book.destroy();

        res.status(204).end();
    } catch (error) {
        console.error("Ошибка при удалении книги:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при удалении книги",
        });
    }
};
