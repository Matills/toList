const List = require("../models/List");

class ListService {
  static async createList({ userId, name, description }) {
    return await List.create({ userId, name, description });
  }

  static async getListsByUser(userId) {
    return await List.findByUserId(userId);
  }

  static async updateList(id, { name, description }) {
    return await List.update(id, { name, description });
  }

  static async deleteList(id) {
    return await List.delete(id);
  }
}

module.exports = ListService;