const SharedList = require("../models/SharedList");
const List = require("../models/List");
const ListItem = require("../models/ListItem");
const User = require("../models/User");
const logger = require("../utils/logger");

class SharedListService {
  static async shareList({ listId, userId, permission }) {
    logger.info(`Compartiendo lista ${listId} con usuario ${userId} (permiso: ${permission})`);
    
    const user = await User.findById(userId);
    if (!user) {
      logger.error(`Usuario ${userId} no encontrado`);
      throw new Error("Usuario no encontrado");
    }
    
    const list = await ListItem.findByListId(listId);
    if (!list) {
      logger.error(`Lista ${listId} no encontrada`);
      throw new Error("Lista no encontrada");
    }
    
    const existingShare = await SharedList.checkPermission(listId, userId);
    if (existingShare) {
      logger.warn(`La lista ${listId} ya está compartida con el usuario ${userId}`);
      if (existingShare.status === 'deleted') {
        return await SharedList.updatePermission(existingShare.id, permission);
      }
      throw new Error("La lista ya está compartida con este usuario");
    }
    
    const sharedList = await SharedList.share({ listId, userId, permission });
    logger.info(`Lista compartida con éxito: ${sharedList.id}`);
    
    return {
      id: sharedList.id,
      listId: sharedList.list_id,
      userId: sharedList.user_id,
      permission: sharedList.permission
    };
  }

  static async getShareById(shareId) {
    logger.info(`Buscando información de compartición ${shareId}`);
    try {
      const share = await SharedList.findById(shareId);
      if (!share) {
        logger.warn(`Compartición ${shareId} no encontrada`);
        return null;
      }
      
      logger.debug(`Compartición ${shareId} recuperada`);
      return {
        id: share.id,
        listId: share.list_id,
        userId: share.user_id,
        permission: share.permission
      };
    } catch (error) {
      logger.error(`Error al buscar compartición ${shareId}: ${error.message}`);
      throw error;
    }
  }

  static async getSharedListsByUser(userId) {
    logger.info(`Obteniendo listas compartidas con usuario ${userId}`);
    const sharedLists = await SharedList.findByUserId(userId);
    logger.debug(`Se recuperaron ${sharedLists.length} listas compartidas`);
    
    return sharedLists.map(list => ({
      id: list.id,
      name: list.name,
      description: list.description,
      permission: list.permission
    }));
  }

  static async getSharedUsers(listId) {
    logger.info(`Obteniendo usuarios con acceso a lista ${listId}`);
    const sharedUsers = await SharedList.findByListId(listId);
    logger.debug(`Se recuperaron ${sharedUsers.length} usuarios con acceso`);
    
    return sharedUsers.map(user => ({
      id: user.id,
      userId: user.user_id,
      name: user.name,
      email: user.email,
      permission: user.permission
    }));
  }

  static async updateSharePermission(sharedListId, permission) {
    logger.info(`Actualizando permiso para compartición ${sharedListId} a ${permission}`);
    try {
      const updatedShare = await SharedList.updatePermission(sharedListId, permission);
      logger.info(`Permiso actualizado exitosamente`);
      return {
        id: updatedShare.id,
        listId: updatedShare.list_id,
        userId: updatedShare.user_id,
        permission: updatedShare.permission
      };
    } catch (error) {
      logger.error(`Error al actualizar permiso: ${error.message}`);
      throw error;
    }
  }

  static async unshareList(sharedListId) {
    logger.info(`Eliminando compartición ${sharedListId}`);
    try {
      const unshared = await SharedList.unshare(sharedListId);
      logger.info(`Compartición eliminada exitosamente`);
      return {
        id: unshared.id,
        listId: unshared.list_id,
        userId: unshared.user_id
      };
    } catch (error) {
      logger.error(`Error al eliminar compartición: ${error.message}`);
      throw error;
    }
  }

  static async checkUserAccess(listId, userId) {
    logger.info(`Verificando acceso de usuario ${userId} a lista ${listId}`);
    
    const list = await List.findById(listId);
    if (list && list.user_id === userId) {
      logger.debug(`Usuario ${userId} es propietario de la lista ${listId}`);
      return { isOwner: true, permission: 'owner' };
    }
    
    const permission = await SharedList.checkPermission(listId, userId);
    if (permission) {
      logger.debug(`Usuario ${userId} tiene acceso a lista ${listId} con permiso: ${permission.permission}`);
      return { isOwner: false, permission: permission.permission };
    }
    
    logger.debug(`Usuario ${userId} no tiene acceso a lista ${listId}`);
    return { isOwner: false, permission: null };
  }
}

module.exports = SharedListService;