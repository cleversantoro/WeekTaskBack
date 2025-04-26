const express = require("express");
const auth = require("../middlewares/auth");
const taskController = require("../controllers/taskController");

const router = express.Router();

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
router.post("/", auth, taskController.createTask);

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
router.get("/", auth, taskController.getTasks);

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
router.put("/:id", auth, taskController.updateTask);

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
router.delete("/:id", auth, taskController.deleteTask);

/**
 * @swagger
 * /tasks/{id}/complete:
 *   patch:
 *     summary: Marcar uma tarefa como concluída e enviar notificação por email
 *     description: Atualiza o status de uma tarefa para "concluído" e envia um email de notificação para o usuário.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa a ser concluída
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tarefa concluída com sucesso e email enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa concluída e notificação enviada"
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa não encontrada"
 *       500:
 *         description: Erro interno ao processar a solicitação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao concluir tarefa"
 */
router.patch("/:id/complete", auth, taskController.completeTask);

module.exports = router;
