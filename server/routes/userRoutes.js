const express = require("express");
const {
  getUsers,
  getSingleUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  loginUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(getSingleUsers)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/").get(getUsers).post(createUser).delete(deleteAllUsers);

userRouter.route("/login").post(loginUser);

module.exports = userRouter;
