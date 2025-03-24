const User = require("../models/User");
const { hashPassword, comparePasswords } = require("../utils/passwordUtils");

class UserService {
  static async createUser({ name, email, password }) {
    const emailExists = await User.findByEmail(email);
    if (emailExists) {
      throw new Error("El email ya está registrado");
    }
    const nameExists = await User.findByName(name);
    if (nameExists) {
      throw new Error("El nombre ya está registrado");
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword, role: "user" });
    return user;
  }

  static async loginUser(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    return user;
  }
}

module.exports = UserService;