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

taskRouter.route("/").get(getTasks).post(auth, createTask);
taskRouter
  .route("/:id")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = taskRouter;
