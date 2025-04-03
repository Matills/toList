const SharedListService = require('../services/sharedListService');
const ListService = require('../services/listService');
const logger = require('../utils/logger');

const shareList = async (req, res, next) => {
    const { listId } = req.params;
    const { userId, permission } = req.body;
    const currentUserId = req.user.id;

    try {
        const list = await ListService.getListById(listId);
        if (!list || list.userId !== currentUserId) {
            logger.warn(`Usuario ${currentUserId} intentó compartir lista ${listId} que no le pertenece`);
            return res.status(403).json({ message: 'Solo el propietario puede compartir esta lista' });
        }

        const sharedList = await SharedListService.shareList({ listId, userId, permission });
        logger.info(`Lista ${listId} compartida con usuario ${userId} por ${currentUserId}`);
        res.status(201).json(sharedList);
    } catch (error) {
        logger.error(`Error al compartir lista: ${error.message}`);
        next(error);
    }
};

const getSharedWithMe = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const sharedLists = await SharedListService.getSharedListsByUser(userId);
        logger.info(`Recuperadas ${sharedLists.length} listas compartidas con usuario ${userId}`);
        res.status(200).json(sharedLists);
    } catch (error) {
        logger.error(`Error al obtener listas compartidas: ${error.message}`);
        next(error);
    }
};

const getSharedUsers = async (req, res, next) => {
    const { listId } = req.params;
    const userId = req.user.id;

    try {
        const list = await ListService.getListById(listId);
        if (!list || list.userId !== userId) {
            logger.warn(`Usuario ${userId} intentó ver comparticiones de lista ${listId} que no le pertenece`);
            return res.status(403).json({ message: 'Solo el propietario puede ver con quién está compartida la lista' });
        }

        const sharedUsers = await SharedListService.getSharedUsers(listId);
        logger.info(`Recuperados ${sharedUsers.length} usuarios con acceso a lista ${listId}`);
        res.status(200).json(sharedUsers);
    } catch (error) {
        logger.error(`Error al obtener usuarios: ${error.message}`);
        next(error);
    }
};

const updatePermission = async (req, res, next) => {
    const { shareId } = req.params;
    const { permission } = req.body;
    const userId = req.user.id;

    try {
        const sharedInfo = await SharedListService.getShareById(shareId);
        if (!sharedInfo) {
            return res.status(404).json({ message: 'Compartición no encontrada' });
        }

        const list = await ListService.getListById(sharedInfo.listId);
        if (!list || list.userId !== userId) {
            logger.warn(`Usuario ${userId} intentó actualizar permisos de compartición que no le pertenece`);
            return res.status(403).json({ message: 'Solo el propietario puede modificar los permisos' });
        }

        const updatedShare = await SharedListService.updateSharePermission(shareId, permission);
        logger.info(`Permiso actualizado para compartición ${shareId} por usuario ${userId}`);
        res.status(200).json(updatedShare);
    } catch (error) {
        logger.error(`Error al actualizar permiso: ${error.message}`);
        next(error);
    }
};

const unshareList = async (req, res, next) => {
    const { shareId } = req.params;
    const userId = req.user.id;

    try {
        const sharedInfo = await SharedListService.getShareById(shareId);
        if (!sharedInfo) {
            return res.status(404).json({ message: 'Compartición no encontrada' });
        }

        const list = await ListService.getListById(sharedInfo.listId);
        if (!list || list.userId !== userId) {
            logger.warn(`Usuario ${userId} intentó dejar de compartir lista que no le pertenece`);
            return res.status(403).json({ message: 'Solo el propietario puede dejar de compartir la lista' });
        }

        const unshared = await SharedListService.unshareList(shareId);
        logger.info(`Lista dejada de compartir (ID: ${shareId}) por usuario ${userId}`);
        res.status(200).json(unshared);
    } catch (error) {
        logger.error(`Error al dejar de compartir: ${error.message}`);
        next(error);
    }
};

module.exports = { shareList, getSharedWithMe, getSharedUsers, updatePermission, unshareList };