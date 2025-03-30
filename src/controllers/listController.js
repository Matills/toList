const ListService = require("../services/listService");

const createList = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const list = await ListService.createList({ userId, name, description });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la lista" });
  }
};

const getLists = async (req, res) => {
  const userId = req.user.id;

  try {
    const lists = await ListService.getListsByUser(userId);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las listas" });
  }
};

const updateList = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedList = await ListService.updateList(id, { name, description });
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la lista" });
  }
};

const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    await ListService.deleteList(id);
    res.status(200).json({ message: "Lista eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la lista" });
  }
};

module.exports = { createList, getLists, updateList, deleteList };