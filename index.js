const express = require("express");
const app = express();
const db = require("./config/database");

// Подключение маршрутов
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(express.json());

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/", categoryRoutes);
app.use("/api/", commentRoutes);

// Проверка подключения к БД
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

const PORT = process.env.PORT || 3000; // Убедитесь, что порт совпадает (3000)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
