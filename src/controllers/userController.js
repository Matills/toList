const UserService = require("../services/userService");
const { generateToken } = require("../utils/jwtUtils");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserService.createUser({ name, email, password });
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    if (error.message === "El email ya está registrado" || error.message === "El nombre ya está registrado") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.loginUser(email, password);
    const token = generateToken(user);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ message: "Login exitoso", user: userResponse, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const userExists = await UserService.findUserById(id);
    if (!userExists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedUser = await UserService.updateUser(id, { name, email, password });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

const getProfile = (req, res) => {
  const { iat, exp, ...userData } = req.user;
  res.json({
    message: "Bienvenido a tu perfil",
    user: userData,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await UserService.deleteUser(id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

module.exports = { createUser, loginUser, updateUser, getProfile, deleteUser };