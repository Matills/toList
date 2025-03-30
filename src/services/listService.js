const List = require("../models/List");

class ListService {
  static async createList({ userId, name, description }) {
    const list = await List.create({ userId, name, description });
    return {
      id: list.id,
      name: list.name,
      description: list.description,
    };
  }

  static async getListsByUser(userId) {
    const lists = await List.findByUserId(userId);
    return lists.map((list) => ({
      id: list.id,
      name: list.name,
      description: list.description,
    }));
  }

  static async updateList(id, { name, description }) {
    const updatedList = await List.update(id, { name, description });
    return {
      id: updatedList.id,
      name: updatedList.name,
      description: updatedList.description,
    };
  }

  static async deleteList(id) {
    const deletedList = await List.delete(id);
    return {
      id: deletedList.id,
      name: deletedList.name,
      description: deletedList.description,
    };
  }
}

module.exports = ListService;