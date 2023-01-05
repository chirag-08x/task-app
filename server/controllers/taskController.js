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
    const allTasks = await Task.find();
    res.status(200).json({
      success: true,
      results: allTasks.length,
      data: allTasks,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
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
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

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
