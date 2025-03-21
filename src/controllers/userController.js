const UserService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.loginUser(email, password);
    res.status(200).json({ message: 'Login exitoso', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser };