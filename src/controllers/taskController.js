const Task = require("../models/Task");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de Tarefas
 */


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar uma nova tarefa
 *     description: Cria uma nova tarefa associada ao usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Fazer compras"
 *               description:
 *                 type: string
 *                 example: "Comprar frutas e legumes"
 *               status:
 *                 type: string
 *                 enum: [pendente, em progresso, concluído]
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       500:
 *         description: Erro ao criar tarefa
 */
exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.create({ title, description, status, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa" });
    }
};

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas do usuário
 *     description: Retorna todas as tarefas associadas ao usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas obtida com sucesso
 *       500:
 *         description: Erro ao buscar tarefas
 */
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar uma tarefa
 *     description: Atualiza os dados de uma tarefa existente, desde que pertença ao usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nova tarefa"
 *               description:
 *                 type: string
 *                 example: "Descrição da tarefa atualizada"
 *               status:
 *                 type: string
 *                 enum: [pendente, em progresso, concluído]
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro ao atualizar tarefa
 */
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const task = await Task.findByPk(id);
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        await task.update({ title, description, status });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
};

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Excluir uma tarefa
 *     description: Remove uma tarefa específica do usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser excluída
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro ao excluir tarefa
 */
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        await task.destroy();
        res.json({ message: "Tarefa removida com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir tarefa" });
    }
};
