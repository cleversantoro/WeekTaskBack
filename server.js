const app = require("./src/app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 3000;
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

const startServer = async (retries = 0) => {
    try {
        await sequelize.sync({ force: false });
        console.log("Banco de dados sincronizado.");
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        if (error.code === 'ECONNREFUSED' && retries < MAX_RETRIES) {
            console.error(`Erro ao sincronizar o banco de dados. Tentando novamente em ${RETRY_DELAY / 1000} segundos...`);
            setTimeout(() => startServer(retries + 1), RETRY_DELAY);
        } else {
            console.error("Erro ao sincronizar o banco de dados:", error);
        }
    }
};

startServer();


