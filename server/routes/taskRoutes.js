const express = require("express");
const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const taskRouter = express.Router();
const auth = require("../middleware/auth");

taskRouter.route("/").get(auth, getTasks).post(auth, createTask);
taskRouter
  .route("/:id")
  .get(auth, getSingleTask)
  .patch(auth, updateTask)
  .delete(auth, deleteTask);

module.exports = taskRouter;
