const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WeekTasks API",
            version: "1.0.0",
            description: "API para gerenciamento de tarefas e autenticação",
        },
        servers: [
            { 
                url: "http://localhost:3000", 
                descriotion: "Servidor Local"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ BearerAuth: [] }],
    },
    apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const specs = swaggerJsdoc(options);

// Salvar JSON para importar no Postman
fs.writeFileSync("./src/swagger.json", JSON.stringify(specs, null, 2));


module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    // Rota para baixar o JSON do Swagger
    app.get("/swagger.json", (req, res) => {
        res.sendFile(__dirname + "/swagger.json");
    });    
};
