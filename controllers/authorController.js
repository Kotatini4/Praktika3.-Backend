const Author = require("../models/author");

exports.createAuthor = async (req, res) => {
    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
        return res
            .status(400)
            .json({ message: "Author name and lastname is required" });
    }
    try {
        const existing = await Author.findOne({
            where: {
                firstName: first_name,
                lastName: last_name,
            },
        });
        if (existing) {
            return res.status(409).json({ message: "Author already exists" });
        }
        const author = await Author.create({
            firstName: first_name,
            lastName: last_name,
        });

        res.status(201).json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating the books author",
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
