// userController.js
const jwt = require('../midleware/jwt');
const User = require('../models/UserModel');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.generateToken(user);
    res.send({ token });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).send({ message: 'Error registering user' });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).send({ message: 'Invalid email or password' });
//     }
//     const token = jwt.generateToken(user);
//     res.send({ token });
//   } catch (err) {
//     res.status(400).send({ message: 'Error logging in user' });
//   }
// };
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.generateToken(user);
    res.send({ token });
  } catch (err) {
    console.error(err); // Log the error details for debugging purposes
    res.status(400).send({ message: 'Error logging in user: ' + err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: 'Error getting user profile' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: 'Error updating user profile' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};