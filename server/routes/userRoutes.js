const express = require("express");
const {
  getUsers,
  getSingleUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  loginUser,
  logout,
  logoutAll,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.route("/me").get(auth, getUsers);

userRouter
  .route("/:id")
  .get(getSingleUsers)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/").post(createUser).delete(deleteAllUsers);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(auth, logout);
userRouter.route("/logout/all").post(auth, logoutAll);

module.exports = userRouter;
