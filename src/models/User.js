const pool = require("../config/database");

class User {
  static async create({ name, email, password, role = "user" }) {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, password, role];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1;";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async findByName(name) {
    const query = "SELECT * FROM users WHERE name = $1;";
    const { rows } = await pool.query(query, [name]);
    return rows[0];
  }
}

module.exports = User;