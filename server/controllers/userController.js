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

const getSingleUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Resource not found",
      });
    }

    for (const key in user) {
      if (key in req.body) {
        user[key] = req.body[key];
      }
    }
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
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
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
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

const deleteAllUsers = async (req, res) => {
  try {
    const user = await User.remove({});

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
  getSingleUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
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
