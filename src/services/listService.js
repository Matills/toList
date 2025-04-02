const List = require("../models/List");
const logger = require("../utils/logger");

class ListService {
  static async createList({ userId, name, description }) {
    logger.info(`Creando nueva lista "${name}" para usuario ${userId}`);
    const list = await List.create({ userId, name, description });
    logger.info(`Lista creada con éxito: ${list.id}`);
    return {
      id: list.id,
      name: list.name,
      description: list.description,
    };
  }

  static async getListsByUser(userId) {
    logger.info(`Obteniendo listas para usuario ${userId}`);
    const lists = await List.findByUserId(userId);
    logger.debug(`Se recuperaron ${lists.length} listas para usuario ${userId}`);
    return lists.map((list) => ({
      id: list.id,
      name: list.name,
      description: list.description,
    }));
  }

  static async getListById(id) {
    logger.info(`Obteniendo lista con ID ${id}`);
    try {
      const list = await List.findById(id);
      if (!list) {
        logger.warn(`Lista con ID ${id} no encontrada`);
        return null;
      }
      
      logger.debug(`Lista ${id} recuperada exitosamente`);
      return {
        id: list.id,
        userId: list.user_id,
        name: list.name,
        description: list.description
      };
    } catch (error) {
      logger.error(`Error al obtener lista ${id}: ${error.message}`);
      throw error;
    }
  }

  static async updateList(id, { name, description }) {
    logger.info(`Actualizando lista ${id}`);
    try {
      const updatedList = await List.update(id, { name, description });
      logger.info(`Lista ${id} actualizada exitosamente`);
      return {
        id: updatedList.id,
        name: updatedList.name,
        description: updatedList.description,
      };
    } catch (error) {
      logger.error(`Error al actualizar lista ${id}: ${error.message}`);
      throw error;
    }
  }

  static async deleteList(id) {
    logger.info(`Eliminando lista ${id}`);
    try {
      const deletedList = await List.delete(id);
      logger.info(`Lista ${id} eliminada exitosamente`);
      return {
        id: deletedList.id,
        name: deletedList.name,
        description: deletedList.description,
      };
    } catch (error) {
      logger.error(`Error al eliminar lista ${id}: ${error.message}`);
      throw error;
    }
  }

  static async getAllUserLists(userId) {
    logger.info(`Obteniendo todas las listas para usuario ${userId} (propias y compartidas)`);
    
    const ownLists = await List.findByUserId(userId);
    const sharedLists = await SharedList.findByUserId(userId);
    
    const result = {
      ownLists: ownLists.map(list => ({
        id: list.id,
        name: list.name,
        description: list.description,
        isOwner: true
      })),
      sharedLists: sharedLists.map(list => ({
        id: list.id,
        name: list.name,
        description: list.description,
        isOwner: false,
        permission: list.permission
      }))
    };
    
    logger.debug(`Recuperadas ${result.ownLists.length} listas propias y ${result.sharedLists.length} compartidas`);
    return result;
  }
}

module.exports = ListService;