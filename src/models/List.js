const pool = require("../config/database");
const logger = require("../utils/logger");

class List {
  static async create({ userId, name, description }) {
    const query = `
      INSERT INTO lists (user_id, name, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [userId, name, description];
    logger.debug(`Creando lista para usuario ${userId}: ${name}`);
    const { rows } = await pool.query(query, values);
    logger.debug(`Lista creada con ID: ${rows[0].id}`);
    return rows[0];
  }

  static async findByUserId(userId) {
    const query = "SELECT * FROM lists WHERE user_id = $1 AND status = 'active';";
    logger.debug(`Buscando listas del usuario: ${userId}`);
    const { rows } = await pool.query(query, [userId]);
    logger.debug(`Se encontraron ${rows.length} listas para el usuario ${userId}`);
    return rows;
  }

  static async findById(id) {
    const query = "SELECT * FROM lists WHERE id = $1 AND status = 'active';";
    logger.debug(`Buscando lista por ID: ${id}`);
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      logger.warn(`No se encontró la lista con ID ${id}`);
      return null;
    }
    logger.debug(`Lista ${id} encontrada`);
    return rows[0];
  }

  static async update(id, { name, description }) {
    const query = `
      UPDATE lists
      SET name = $1, description = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const values = [name, description, id];
    logger.debug(`Actualizando lista ${id}`);
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      logger.warn(`No se encontró la lista ${id} para actualizar`);
      throw new Error("Lista no encontrada");
    }
    logger.debug(`Lista ${id} actualizada correctamente`);
    return rows[0];
  }

  static async delete(id) {
    const query = `
      UPDATE lists
      SET status = 'deleted', updated_at = NOW()
      WHERE id = $1 AND status = 'active'
      RETURNING *;
    `;
    logger.debug(`Eliminando lista ${id}`);
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      logger.warn(`No se encontró la lista ${id} para eliminar o ya estaba eliminada`);
      throw new Error("Lista no encontrada o ya eliminada");
    }
    logger.debug(`Lista ${id} marcada como eliminada`);
    return rows[0];
  }
}

module.exports = List;