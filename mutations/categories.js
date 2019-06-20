const { v1 } = require('uuid');
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById
} = require('../db/models');

module.exports = {
  addCategory: (parent, { input }) => {
    const newCategory = {
      ...input,
      id: v1()
    };

    return createCategory(newCategory);
  },
  removeCategory: (parent, { id }) => deleteCategory(id),
  updateCategory: async (parent, { id, input }) => {
    const category = await getCategoryById(id);
    const data = {
      ...category,
      ...input
    };

    return updateCategory(id, data);
  }
};
