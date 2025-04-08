const { sequelize } = require("./models");

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Подключение к БД успешно");
    } catch (error) {
        console.error("❌ Ошибка подключения:", error);
    } finally {
        await sequelize.close();
    }
}

testConnection();

//NODE_ENV=development node db-test.js
