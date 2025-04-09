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

        // Маппинг полей запроса на модель
        const bookData = {
            title: book_title,
            description: book_description,
            publicationYear: publication_year,
            category_id: category_id,
        };

        if (!bookData.title || !bookData.category_id) {
            return res.status(400).json({
                success: false,
                message: "Название книги и категория обязательны",
            });
        }

        // Создаем книгу
        const book = await Book.create(bookData);

        // Добавляем авторов
        if (author_ids && author_ids.length > 0) {
            const existingAuthors = await Author.findAll({
                where: { authorId: author_ids },
            });

            if (existingAuthors.length !== author_ids.length) {
                return res.status(400).json({
                    success: false,
                    message: "Один или несколько авторов не найдены",
                });
            }

            await book.setAuthors(author_ids);
        }

        // Получаем созданную книгу с отношениями
        const createdBook = await Book.findByPk(book.bookId, {
            include: [
                {
                    model: Author,
                    as: "authors", // Указываем алиас, который используется в ассоциации
                    through: { attributes: [] },
                },
                {
                    model: Category,
                    as: "category", // Указываем алиас, который используется в ассоциации
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
                    ? error.message
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
                    as: "authors", // Указываем алиас, который используется в ассоциации
                    through: { attributes: [] },
                    attributes: ["authorId", "firstName", "lastName"], // Явно указываем нужные поля
                },
                {
                    model: Category,
                    as: "category", // Указываем алиас, который используется в ассоциации
                    attributes: ["categoryId", "name"], // Явно указываем нужные поля
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
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: [
                {
                    model: Author,
                    as: "authors",
                    through: { attributes: [] },
                    attributes: ["authorId", "firstName", "lastName"],
                },
                {
                    model: Category,
                    as: "category",
                    attributes: ["categoryId", "name"],
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
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
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

        // Маппинг полей для обновления
        const updateData = {
            title: book_title || book.title,
            description: book_description || book.description,
            publicationYear: publication_year || book.publicationYear,
            category_id: category_id || book.category_id,
            lastUpdate: new Date(),
        };

        await book.update(updateData);

        // Обновление авторов
        if (author_ids) {
            const existingAuthors = await Author.findAll({
                where: { authorId: author_ids },
            });

            if (existingAuthors.length !== author_ids.length) {
                return res.status(400).json({
                    success: false,
                    message: "Один или несколько авторов не найдены",
                });
            }

            await book.setAuthors(author_ids);
        }

        // Получаем обновленную книгу с отношениями
        const updatedBook = await Book.findByPk(book.bookId, {
            include: [
                {
                    model: Author,
                    as: "authors",
                    through: { attributes: [] },
                    attributes: ["authorId", "firstName", "lastName"],
                },
                {
                    model: Category,
                    as: "category",
                    attributes: ["categoryId", "name"],
                },
            ],
        });

        res.status(200).json({
            success: true,
            message: "Книга успешно обновлена",
            data: updatedBook,
        });
    } catch (error) {
        console.error("Ошибка при обновлении книги:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при обновлении книги",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
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

        // Удаляем книгу
        await book.destroy();

        res.status(200).json({
            success: true,
            message: "Книга успешно удалена",
        });
    } catch (error) {
        console.error("Ошибка при удалении книги:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при удалении книги",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};
