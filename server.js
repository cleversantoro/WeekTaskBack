const http = require("http");
const { Server } = require("socket.io");
const app = require("./src/app");
const sequelize = require("./src/config/database");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORTEMAIL = process.env.PORTEMAIL || 3000;
const PORTDB = process.env.PORTDB || 3000;
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

io.on("connection", (socket) => {
    console.log("Novo usuário conectado!");

    socket.on("novaTarefa", (tarefa) => {
        io.emit("atualizarTarefas", tarefa);
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado.");
    });
});

server.listen(PORTEMAIL, () => 
    {console.log(`Servidor rodando na porta ${PORTEMAIL}`);}
);


const startServer = async (retries = 0) => {
    try {
        await sequelize.sync({ force: false });
        console.log("Banco de dados sincronizado.");
        app.listen(PORTDB, () => {
            console.log(`Servidor rodando na porta ${PORTDB}`);
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


