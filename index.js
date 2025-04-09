const express = require("express");

const app = express();
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

app.use(express.json());

app.use("", bookRoutes);
app.use("", authorRoutes);

// The port on which the server will run

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
