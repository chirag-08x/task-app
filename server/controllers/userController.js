const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();
    res.status(201).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  res.json(req.user);
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
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
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
  logoutAll,
};

// Won't use this method in production since we don't want to produce a list of all users to the client.
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({
//       success: true,
//       data: users,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
