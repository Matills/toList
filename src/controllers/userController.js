const UserService = require("../services/userService");
const { generateToken } = require("../utils/jwtUtils");
const logger = require("../utils/logger");

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    logger.info(`Creando usuario con email: ${email}`);
    const user = await UserService.createUser({ name, email, password });
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    logger.info(`Usuario creado exitosamente: ${user.id}`);
    res.status(201).json(userResponse);
  } catch (error) {
    logger.error(`Error al crear usuario: ${error.message}`);
    if (error.message === "El email ya está registrado" || error.message === "El nombre ya está registrado") {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    logger.info(`Intento de login para usuario: ${email}`);
    const user = await UserService.loginUser(email, password);
    const token = generateToken(user);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    logger.info(`Login exitoso para usuario: ${user.id}`);
    res.status(200).json({ message: "Login exitoso", user: userResponse, token });
  } catch (error) {
    logger.warn(`Intento de login fallido: ${error.message}`);
    res.status(401).json({ error: error.message });
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    logger.info(`Actualizando usuario con ID: ${id}`);
    const userExists = await UserService.getUserById(id);
    if (!userExists) {
      logger.warn(`Intento de actualizar usuario inexistente con ID: ${id}`);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedUser = await UserService.updateUser(id, { name, email, password });
    logger.info(`Usuario actualizado correctamente: ${id}`);
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(`Error al actualizar usuario ${id}: ${error.message}`);
    next(error);
  }
};

const getProfile = (req, res) => {
  const { id, name, email, role } = req.user;
  logger.info(`Usuario ${id} accedió a su perfil`);
  
  res.json({
    message: "Bienvenido a tu perfil",
    user: { id, name, email, role },
  });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    logger.info(`Eliminando usuario con ID: ${id}`);
    await UserService.deleteUser(id);
    logger.info(`Usuario eliminado correctamente: ${id}`);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    logger.error(`Error al eliminar usuario ${id}: ${error.message}`);
    next(error);
  }
};

module.exports = { createUser, loginUser, updateUser, getProfile, deleteUser };