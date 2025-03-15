const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
};

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
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erro no login" });
    }
};
