const pool = require("../config/database");

class List {
  static async create({ userId, name, description }) {
    const query = `
      INSERT INTO lists (user_id, name, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [userId, name, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByUserId(userId) {
    const query = "SELECT * FROM lists WHERE user_id = $1 and status 'active';";
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  static async update(id, { name, description }) {
    const query = `
      UPDATE lists
      SET name = $1, description = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const values = [name, description, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = `
      UPDATE lists
      SET status = 'deleted', updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = List;