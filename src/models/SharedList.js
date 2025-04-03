const pool = require("../config/database");
const logger = require("../utils/logger");

class SharedList {
  static async share({ listId, userId, permission }) {
    const query = `
      INSERT INTO shared_lists (list_id, user_id, permission)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [listId, userId, permission];
    logger.debug(`Compartiendo lista ${listId} con usuario ${userId} (permiso: ${permission})`);
    const { rows } = await pool.query(query, values);
    logger.debug(`Lista compartida con ID: ${rows[0].id}`);
    return rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT * FROM shared_lists
      WHERE id = $1 AND status = 'active';
    `;
    logger.debug(`Buscando compartición por ID: ${id}`);
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      logger.warn(`No se encontró la compartición con ID ${id}`);
      return null;
    }
    logger.debug(`Compartición ${id} encontrada`);
    return rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT l.*, sl.permission
      FROM lists l
      JOIN shared_lists sl ON l.id = sl.list_id
      WHERE sl.user_id = $1 
      AND sl.status = 'active'
      AND l.status = 'active';
    `;
    logger.debug(`Buscando listas compartidas con el usuario: ${userId}`);
    const { rows } = await pool.query(query, [userId]);
    logger.debug(`Se encontraron ${rows.length} listas compartidas para el usuario ${userId}`);
    return rows;
  }

  static async findByListId(listId) {
    const query = `
      SELECT sl.*, u.name, u.email
      FROM shared_lists sl
      JOIN users u ON sl.user_id = u.id
      WHERE sl.list_id = $1 
      AND sl.status = 'active';
    `;
    logger.debug(`Buscando usuarios con acceso a la lista: ${listId}`);
    const { rows } = await pool.query(query, [listId]);
    logger.debug(`Se encontraron ${rows.length} usuarios con acceso a la lista ${listId}`);
    return rows;
  }

  static async updatePermission(id, permission) {
    const query = `
      UPDATE shared_lists
      SET permission = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;
    const values = [permission, id];
    logger.debug(`Actualizando permiso para compartición ${id} a ${permission}`);
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      logger.warn(`No se encontró la compartición ${id} para actualizar`);
      throw new Error("Compartición no encontrada");
    }
    logger.debug(`Permiso actualizado correctamente para ${id}`);
    return rows[0];
  }

  static async unshare(id) {
    const query = `
      UPDATE shared_lists
      SET status = 'deleted', updated_at = NOW()
      WHERE id = $1 AND status = 'active'
      RETURNING *;
    `;
    logger.debug(`Eliminando compartición ${id}`);
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      logger.warn(`No se encontró la compartición ${id} para eliminar o ya estaba eliminada`);
      throw new Error("Compartición no encontrada o ya eliminada");
    }
    logger.debug(`Compartición ${id} marcada como eliminada`);
    return rows[0];
  }

  static async checkPermission(listId, userId) {
    const query = `
      SELECT * FROM shared_lists
      WHERE list_id = $1 AND user_id = $2 AND status = 'active';
    `;
    const values = [listId, userId];
    logger.debug(`Verificando permisos para lista ${listId} y usuario ${userId}`);
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      logger.debug(`No hay permisos para lista ${listId} y usuario ${userId}`);
      return null;
    }
    logger.debug(`Permisos encontrados: ${rows[0].permission}`);
    return rows[0];
  }
}

module.exports = SharedList;