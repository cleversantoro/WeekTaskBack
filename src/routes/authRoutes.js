const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de Autenticação
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     description: Cria uma conta para um novo usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "minhaSenha123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       500:
 *         description: Erro ao criar usuário
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar um usuário
 *     description: Realiza login e retorna um token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "minhaSenha123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsIn..."
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no login
 */
router.post("/login", login);

module.exports = router;
