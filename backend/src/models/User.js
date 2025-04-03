const pool = require("../config/database");
const logger = require("../utils/logger");

class User {
  static async create({ name, email, password, role = "user" }) {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, password, role];
    logger.debug(`Ejecutando query INSERT en tabla users`);
    const { rows } = await pool.query(query, values);
    logger.debug(`Registro insertado con ID: ${rows[0].id}`);
    return rows[0];
  }

  static async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1 AND status = 'active';";
    logger.debug(`Ejecutando consulta para buscar usuario por ID: ${id}`);
    const { rows } = await pool.query(query, [id]);
    logger.debug(`Resultado de búsqueda por ID ${id}: ${rows.length > 0 ? 'encontrado' : 'no encontrado'}`);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1 and status = 'active';";
    logger.debug(`Buscando usuario por email: ${email}`);
    const { rows } = await pool.query(query, [email]);
    logger.debug(`Resultado búsqueda por email: ${email} - Encontrado: ${!!rows[0]}`);
    return rows[0];
  }

  static async findByName(name) {
    const query = "SELECT * FROM users WHERE name = $1 and status = 'active';";
    logger.debug(`Buscando usuario por nombre: ${name}`);
    const { rows } = await pool.query(query, [name]);
    logger.debug(`Resultado búsqueda por nombre: ${name} - Encontrado: ${!!rows[0]}`);
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
      logger.warn(`Intento de actualización sin campos para actualizar: ${id}`);
      throw new Error("No hay campos para actualizar");
    }
  
    const query = `
      UPDATE users
      SET ${setClauses.join(", ")}, updated_at = NOW()
      WHERE id = $${index}
      RETURNING *;
    `;
    values.push(id);
    
    logger.debug(`Ejecutando UPDATE para usuario: ${id} - Campos: ${setClauses.join(", ")}`);
    const { rows } = await pool.query(query, values);
    logger.debug(`Usuario actualizado: ${id} - Éxito: ${!!rows[0]}`);
    return rows[0];
  }

  static async delete(id) {
    const query = `
      UPDATE users
      SET status = 'deleted', updated_at = NOW()
      WHERE id = $1 AND status != 'deleted'
      RETURNING *;
    `;
    logger.debug(`Ejecutando soft delete para usuario: ${id}`);
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      logger.warn(`Intento de eliminar usuario inexistente o ya eliminado: ${id}`);
      throw new Error("El usuario ya está eliminado o no existe");
    }
    logger.debug(`Usuario marcado como eliminado: ${id}`);
    return rows[0];
  }
}

module.exports = User;