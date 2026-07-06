const Item = require("../models/Item");

class ItemService {
  async createItem(data) {
    return await Item.create(data);
  }

  async getAllItems() {
    return await Item.find().sort({ createdAt: -1 });
  }

  async getItemById(id) {
    return await Item.findById(id);
  }

  async updateItem(id, data) {
    return await Item.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  async deleteItem(id) {
    return await Item.findByIdAndDelete(id);
  }
}

module.exports = new ItemService();