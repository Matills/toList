const ListService = require("../services/listService");
const logger = require("../utils/logger");

const createList = async (req, res, next) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    logger.info(`Usuario ${userId} está creando una nueva lista: ${name}`);
    const list = await ListService.createList({ userId, name, description });
    logger.info(`Lista creada exitosamente: ${list.id}`);
    res.status(201).json(list);
  } catch (error) {
    logger.error(`Error al crear lista para usuario ${userId}: ${error.message}`);
    next(error);
  }
};

const getLists = async (req, res, next) => {
  const userId = req.user.id;

  try {
    logger.info(`Usuario ${userId} solicitando sus listas`);
    const lists = await ListService.getListsByUser(userId);
    res.status(200).json(lists);
  } catch (error) {
    logger.error(`Error al obtener listas para usuario ${userId}: ${error.message}`);
    next(error);
  }
};

const updateList = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    logger.info(`Usuario ${userId} actualizando lista ${id}`);
    const updatedList = await ListService.updateList(id, { name, description });
    logger.info(`Lista ${id} actualizada correctamente`);
    res.status(200).json(updatedList);
  } catch (error) {
    logger.error(`Error al actualizar lista ${id}: ${error.message}`);
    if (error.message === "Lista no encontrada") {
      res.status(404).json({ error: "Lista no encontrada" });
    } else {
      next(error);
    }
  }
};

const deleteList = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    logger.info(`Usuario ${userId} eliminando lista ${id}`);
    await ListService.deleteList(id);
    logger.info(`Lista ${id} eliminada correctamente`);
    res.status(200).json({ message: "Lista eliminada correctamente" });
  } catch (error) {
    logger.error(`Error al eliminar lista ${id}: ${error.message}`);
    if (error.message === "Lista no encontrada o ya eliminada") {
      res.status(404).json({ error: "Lista no encontrada" });
    } else {
      next(error);
    }
  }
};

module.exports = { createList, getLists, updateList, deleteList };