const { v1 } = require('uuid');
const {
  createWidget,
  deleteWidget,
  updateWidget,
  getWidgetById,
  getCategoryById
} = require('../db/models');

module.exports = {
  addWidget: (parent, { input }) =>
    getCategoryById(input.category.id)
      .then(() => {
        const newWidget = {
          ...input,
          id: v1()
        };

        return createWidget(newWidget);
      })
      .catch(err => {
        if (err.response.status === 404) {
          throw new Error('The category id does not exist');
        }
        return err;
      }),
  removeWidget: (parent, { id }) => deleteWidget(id),
  updateWidget: async (parent, { id, input }) => {
    const widget = await getWidgetById(id);
    const data = {
      ...widget,
      ...input
    };
    return updateWidget(id, data);
  }
};
