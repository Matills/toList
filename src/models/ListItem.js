const pool = require("../config/database");
const logger = require("../utils/logger");

class ListItem {
  static async create({ listId, itemType, itemId, title, description }) {
    const query = `
      INSERT INTO list_items (list_id, item_type, item_id, title, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [listId, itemType, itemId, title, description];
    logger.debug(`Agregando item a lista ${listId}: ${title} (${itemType}:${itemId})`);
    const { rows } = await pool.query(query, values);
    logger.debug(`Item agregado con ID: ${rows[0].id}`);
    return rows[0];
  }

  static async findByListId(listId) {
    const query = "SELECT * FROM list_items WHERE list_id = $1 AND status = 'active';";
    logger.debug(`Buscando items de la lista: ${listId}`);
    const { rows } = await pool.query(query, [listId]);
    logger.debug(`Se encontraron ${rows.length} items para la lista ${listId}`);
    return rows;
  }

  static async delete(id) {
    const query = `
      UPDATE list_items
      SET status = 'deleted', updated_at = NOW()
      WHERE id = $1 AND status = 'active'
      RETURNING *;
    `;
    logger.debug(`Eliminando item ${id}`);
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      logger.warn(`No se encontró el item ${id} para eliminar o ya estaba eliminado`);
      throw new Error("Item no encontrado o ya eliminado");
    }
    logger.debug(`Item ${id} marcado como eliminado`);
    return rows[0];
  }
}

module.exports = ListItem;