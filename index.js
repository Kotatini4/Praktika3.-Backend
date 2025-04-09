const express = require("express");

const app = express();

const categoryRoutes = require("./routes/categoryRoutes");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const searchRoutes = require("./routes/searchRoutes");

app.use(express.json());

app.use("", categoryRoutes);
app.use("", authorRoutes);
app.use("", bookRoutes);
app.use("", authRoutes);
app.use("", commentRoutes);
app.use("", searchRoutes);
require("./swagger")(app);

// The port on which the server will run
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
