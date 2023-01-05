const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
  logoutAll,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter
  .route("/me")
  .get(auth, getUsers)
  .delete(auth, deleteUser)
  .patch(auth, updateUser);

userRouter.route("/").post(createUser);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(auth, logout);
userRouter.route("/logout/all").post(auth, logoutAll);

module.exports = userRouter;
