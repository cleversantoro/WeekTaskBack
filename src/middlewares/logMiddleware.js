const logger = require("../utils/logger");

const logRequests = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

const logErrors = (err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - Error: ${err.message}`);
    res.status(500).json({ error: "Erro interno do servidor" });
};

module.exports = { logRequests, logErrors };

// The logMiddleware.js file exports two functions: 
// logRequests and logErrors. 
// The logRequests function logs the HTTP method and URL of the request. 
// The logErrors function logs the HTTP method, URL, and error message. 
// Both functions use the logger object from the logger.js file to log messages. 
// The logErrors function also sends a 500 status response with an error message in JSON format.

// O arquivo logMiddleware.js exporta duas funções: 
// logRequests e logErrors. 
// A função logRequests registra o método HTTP e a URL da requisição. 
// A função logErrors registra o método HTTP, a URL e a mensagem de erro. 
// Ambas as funções usam o objeto logger do arquivo logger.js para registrar as mensagens. 
// A função logErrors também envia uma resposta com status 500 e uma mensagem de erro em formato JSON.
