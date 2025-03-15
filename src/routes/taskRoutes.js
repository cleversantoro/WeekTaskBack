const express = require("express");
const auth = require("../middlewares/auth");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/", auth, taskController.createTask);
router.get("/", auth, taskController.getTasks);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
