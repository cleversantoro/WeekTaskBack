const Task = require("../models/Task");
const transporter = require("../config/mail");

exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.create({ title, description, status, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
};

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

exports.completeTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        task.status = "concluído";
        await task.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "cleversantoro@gmail.com", // Aqui você pode substituir pelo email do usuário autenticado
            subject: "Tarefa Concluída!",
            text: `Parabéns! Sua tarefa "${task.title}" foi concluída! 🎉`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error("Erro ao enviar email:", error);
            }
        });

        res.json({ message: "Tarefa concluída e notificação enviada" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao concluir tarefa" });
    }
};
