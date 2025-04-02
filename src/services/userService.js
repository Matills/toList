const User = require("../models/User");
const { hashPassword, comparePasswords } = require("../utils/passwordUtils");
const logger = require("../utils/logger");

class UserService {
  static async createUser({ name, email, password }) {
    logger.debug(`Iniciando creación de usuario con email: ${email}`);
    const emailExists = await User.findByEmail(email);
    if (emailExists) {
      logger.info(`Intento de registro con email ya existente: ${email}`);
      throw new Error("El email ya está registrado");
    }
    const nameExists = await User.findByName(name);
    if (nameExists) {
      logger.info(`Intento de registro con nombre ya existente: ${name}`);
      throw new Error("El nombre ya está registrado");
    }
    const hashedPassword = await hashPassword(password);
    logger.debug(`Contraseña hasheada correctamente para: ${email}`);
    const user = await User.create({ name, email, password: hashedPassword, role: "user" });
    logger.debug(`Usuario creado en base de datos: ${user.id}`);
    return user;
  }

  static async loginUser(email, password) {
    logger.debug(`Verificando credenciales para: ${email}`);
    const user = await User.findByEmail(email);
    if (!user) {
      logger.info(`Intento de login con email no encontrado: ${email}`);
      throw new Error("Credenciales inválidas");
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      logger.info(`Contraseña incorrecta para usuario: ${email}`);
      throw new Error("Credenciales inválidas");
    }

    logger.debug(`Credenciales válidas para usuario: ${user.id}`);
    return user;
  }

  static async updateUser(id, { name, email, password }) {
    logger.debug(`Preparando actualización de usuario: ${id}`);
    const fieldsToUpdate = {};
  
    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;
    if (password) {
      logger.debug(`Actualizando contraseña para usuario: ${id}`);
      fieldsToUpdate.password = await hashPassword(password);
    }
  
    const updatedUser = await User.update(id, fieldsToUpdate);
    logger.debug(`Usuario actualizado en base de datos: ${id}`);
  
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  static async deleteUser(id) {
    logger.debug(`Iniciando eliminación de usuario: ${id}`);
    const deletedUser = await User.delete(id);
    logger.debug(`Usuario marcado como eliminado en base de datos: ${id}`);
    return {
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email
    };
  }

  static async getUserById(id) {
    logger.debug(`Buscando usuario por ID: ${id}`);
    const user = await User.findById(id);
    if (!user) {
      logger.warn(`Usuario con ID ${id} no encontrado`);
      return null;
    }
    logger.debug(`Usuario encontrado: ${id}`);
    return user;
  }
}

module.exports = UserService;