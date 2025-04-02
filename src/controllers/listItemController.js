const ListItemService = require('../services/listItemService');
const SharedListService = require('../services/sharedListService');
const logger = require('../utils/logger');

const addItem = async (req, res, next) => {
    const { listId } = req.params;
    const { itemType, itemId } = req.body;
    const userId = req.user.id;

    try {
        const access = await SharedListService.checkUserAccess(listId, userId);
        if (!access.permission || (access.permission !== 'edit' && !access.isOwner)) {
            logger.warn(`Usuario ${userId} intentó agregar item a lista ${listId} sin permisos`);
            return res.status(403).json({ message: 'No tienes permisos para agregar items a esta lista' });
        }

        const listItem = await ListItemService.addItemToList({ listId, itemType, itemId });
        logger.info(`Item agregado a lista ${listId} por usuario ${userId}`);
        res.status(201).json(listItem);
    } catch (error) {
        logger.error(`Error al agregar item: ${error.message}`);
        next(error);
    }
};

const getItems = async (req, res, next) => {
    const { listId } = req.params;
    const userId = req.user.id;

    try {
        const access = await SharedListService.checkUserAccess(listId, userId);
        if (!access.permission && !access.isOwner) {
            logger.warn(`Usuario ${userId} intentó ver items de lista ${listId} sin permisos`);
            return res.status(403).json({ message: 'No tienes permisos para ver esta lista' });
        }

        const items = await ListItemService.getItemsByList(listId);
        logger.info(`Items de lista ${listId} recuperados por usuario ${userId}`);
        res.status(200).json(items);
    } catch (error) {
        logger.error(`Error al obtener items: ${error.message}`);
        next(error);
    }
};

const removeItem = async (req, res, next) => {
    const { listId, itemId } = req.params;
    const userId = req.user.id;

    try {
        const access = await SharedListService.checkUserAccess(listId, userId);
        if (!access.permission || (access.permission !== 'edit' && !access.isOwner)) {
            logger.warn(`Usuario ${userId} intentó eliminar item ${itemId} sin permisos`);
            return res.status(403).json({ message: 'No tienes permisos para editar esta lista' });
        }

        const deletedItem = await ListItemService.removeItem(itemId);
        logger.info(`Item ${itemId} eliminado por usuario ${userId}`);
        res.status(200).json(deletedItem);
    } catch (error) {
        logger.error(`Error al eliminar item: ${error.message}`);
        next(error);
    }
};

module.exports = { addItem, getItems, removeItem };