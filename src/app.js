const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { logRequests, logErrors } = require("./middlewares/logMiddleware");

dotenv.config();

const app = express();
const setupSwagger = require("./swagger");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(logRequests);
app.use(logErrors);

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API WeekTasks rodando!" });
});

setupSwagger(app);

module.exports = app;
