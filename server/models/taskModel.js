const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskname: {
    type: String,
    trim: true,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
