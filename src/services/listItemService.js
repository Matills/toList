const ListItem = require("../models/ListItem");
const TMDbService = require("./tmdbService");
const logger = require("../utils/logger");

class ListItemService {
  static async addItemToList({ listId, itemType, itemId }) {
    logger.info(`Agregando item ${itemType}:${itemId} a lista ${listId}`);
    let internalItemType = itemType;
    if (itemType === 'tv') {
      internalItemType = 'series';
    } else if (itemType === 'movie') {
      internalItemType = 'movie';
    }
    const itemDetails = await TMDbService.getDetails(itemType, itemId);
    
    const listItem = await ListItem.create({
      listId,
      itemType: internalItemType,
      itemId: itemDetails.id,
      title: itemDetails.title || itemDetails.name,
      description: itemDetails.overview
    });
    
    logger.info(`Item agregado con éxito: ${listItem.id}`);
    
    return {
      id: listItem.id,
      itemType: listItem.item_type,
      itemId: listItem.item_id,
      title: listItem.title,
      description: listItem.description
    };
  }

  static async getItemsByList(listId) {
    logger.info(`Obteniendo items para lista ${listId}`);
    const items = await ListItem.findByListId(listId);
    logger.debug(`Se recuperaron ${items.length} items para lista ${listId}`);
    
    return items.map(item => ({
      id: item.id,
      itemType: item.item_type,
      itemId: item.item_id,
      title: item.title,
      description: item.description
    }));
  }

  static async removeItem(id) {
    logger.info(`Eliminando item ${id}`);
    try {
      const deletedItem = await ListItem.delete(id);
      logger.info(`Item ${id} eliminado exitosamente`);
      return {
        id: deletedItem.id,
        itemType: deletedItem.item_type,
        itemId: deletedItem.item_id,
        title: deletedItem.title,
        description: deletedItem.description
      };
    } catch (error) {
      logger.error(`Error al eliminar item ${id}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = ListItemService;