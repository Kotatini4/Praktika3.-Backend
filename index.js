const express = require("express");
const app = express();
const book = require("./routes/bookRoutes");
const author = require("./routes/authorRoutes");

app.use(express.json());

app.use("", book);
app.use("", author);
// The port on which the server will run
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
