const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
require("./database/db");
const express = require("express");
const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

// Mount Router
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Runnning on port " + PORT);
});

// const User = require("./models/userModel");
// const main = async () => {
//   const user = await User.findById("63b64fc6e939796724ea8978");
//   await user.populate("tasks");
//   console.log(user.tasks);
// };

// main();
