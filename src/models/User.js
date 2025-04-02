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
    const query = "SELECT * FROM users WHERE email = $1 and status = 'active';";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async findByName(name) {
    const query = "SELECT * FROM users WHERE name = $1 and status = 'active';";
    const { rows } = await pool.query(query, [name]);
    return rows[0];
  }

  static async update(id, fields) {
    const setClauses = [];
    const values = [];
    let index = 1;
  
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        setClauses.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }
  
    if (setClauses.length === 0) {
      throw new Error("No hay campos para actualizar");
    }
  
    const query = `
      UPDATE users
      SET ${setClauses.join(", ")}, updated_at = NOW()
      WHERE id = $${index}
      RETURNING *;
    `;
    values.push(id);
  
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = `
      UPDATE users
      SET status = 'deleted', updated_at = NOW()
      WHERE id = $1 AND status != 'deleted'
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("El usuario ya está eliminado o no existe");
    }
    return rows[0];
  }
}

module.exports = User;