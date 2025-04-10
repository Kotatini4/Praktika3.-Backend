// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

// Валидация регистрации
const signupValidation = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

// Валидация входа
const signinValidation = [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

router.post("/auth/signup", signupValidation, authController.signup);
router.post("/auth/signin", signinValidation, authController.signin);

module.exports = router;
