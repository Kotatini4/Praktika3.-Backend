const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
app.use(express.json());
app.use("", bookRoutes);
// The port on which the server will run
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
