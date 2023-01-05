const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    // Method - 1
    const allTasks = await Task.find({
      owner: req.user._id,
    });

    // Method - 2 (Populate Tasks)
    await req.user.populate("tasks");

    res.status(200).json({
      success: true,
      results: req.user.tasks.length,
      data: req.user.tasks,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const allowedUpdates = ["taskname", "completed"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      success: false,
      message: "Invalid Operation",
    });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
        data: [],
      });
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
