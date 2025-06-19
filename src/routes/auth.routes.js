const express = require("express");
const router = express.Router();

const UserRepository = require("../repositories/user.repository");
const AuthService = require("../services/auth/auth.service");
const AuthController = require("../controllers/auth/auth.controller");

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
