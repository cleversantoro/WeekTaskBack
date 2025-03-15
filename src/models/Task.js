const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM("pendente", "em progresso", "concluído"), defaultValue: "pendente" },
}, { timestamps: true });

Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

module.exports = Task;
