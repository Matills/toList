const User = require('../models/User');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');

class UserService {
  static async createUser({ name, email, password }) {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  }

  static async loginUser(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }
}

module.exports = UserService;