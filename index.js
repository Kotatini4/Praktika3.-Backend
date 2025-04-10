require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/database");
const swagger = require("./swagger");

// Подключение маршрутов
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
swagger(app);

app.use("/", authorRoutes);
app.use("/", bookRoutes);
app.use("/", categoryRoutes);
app.use("/", commentRoutes);
app.use("/", authRoutes);

// Проверка подключения к БД
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

const PORT = process.env.PORT || 3000; // Убедитесь, что порт совпадает (3000)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
