// test.js
const fs = require("fs");
const path = require("path");

const modelsDir = path.join(__dirname, "models");

console.log("Checking models directory:");
fs.readdirSync(modelsDir).forEach((file) => {
    console.log(
        `- ${file} (${
            fs.existsSync(path.join(modelsDir, file)) ? "exists" : "MISSING"
        })`
    );
});
