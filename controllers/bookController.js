const { Book, Author, Category } = require("../models");

exports.createBook = async (req, res) => {
    try {
        const {
            book_title,
            book_description,
            publication_year,
            category_id,
            author_ids,
        } = req.body;

        const book = await Book.create({
            book_title,
            book_description,
            publication_year,
            category_id,
            last_update: new Date(),
        });

        if (author_ids && author_ids.length) {
            await book.setAuthors(author_ids);
        }

        const bookWithDetails = await Book.findByPk(book.book_id, {
            include: [{ model: Author }, { model: Category }],
        });

        res.status(201).json(bookWithDetails);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({
            message: "Error creating book",
            error: error.message,
        });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [{ model: Author }, { model: Category }],
        });
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({
            message: "Error fetching books",
            error: error.message,
        });
    }
};
