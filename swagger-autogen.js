const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = [
    "./routes/authorRoutes.js",
    "./routes/bookRoutes.js",
    "./routes/categoryRoutes.js",
    "./routes/commentRoutes.js",
];

const doc = {
    info: {
        title: "Library API Documentation",
        description: "Автогенерируемая документация для backend-практики",
    },
    host: "localhost:3000",
    schemes: ["http"],
    tags: [
        { name: "Authors", description: "Управление авторами" },
        { name: "Books", description: "Управление книгами" },
        { name: "Categories", description: "Категории книг" },
        { name: "Comments", description: "Комментарии к книгам" },
    ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
