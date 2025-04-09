const db = require("./database");
const { Book, Author, Category, Comment, User, Role } = require("../models");

async function setupDatabase() {
    try {
        // 1. Синхронизация моделей с БД
        await db.sync({ force: true });
        console.log("Таблицы успешно созданы");

        // 3. Создание тестовых данных
        await createInitialData();
        console.log("Тестовые данные добавлены");

        console.log("База данных успешно настроена!");
        process.exit(0);
    } catch (error) {
        console.error("Ошибка при настройке базы данных:", error);
        process.exit(1);
    }
}

async function createInitialData() {
    try {
        // Создание ролей
        const adminRole = await Role.create({ name: "admin" });
        const userRole = await Role.create({ name: "user" });
        console.log("Роли созданы:", adminRole.name, userRole.name);

        // Создание тестового пользователя
        await User.create({
            email: "test@test.com",
            username: "admin",
            password: "123456", // Пароль будет автоматически хеширован
            role_id: adminRole.id,
        });
        console.log("Тестовый пользователь создан");
    } catch (error) {
        console.error("Ошибка при создании тестовых данных:", error);
        throw error;
    }
}

setupDatabase();
