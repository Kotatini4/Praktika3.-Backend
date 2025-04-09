const express = require("express");
const app = express();
const db = require("./config/database");

// Middleware
app.use(express.json());

// Подключение маршрутов
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);

// Проверка подключения к БД
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

const PORT = process.env.PORT || 3000; // Убедитесь, что порт совпадает (3000)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
