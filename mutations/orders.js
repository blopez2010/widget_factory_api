const { v1 } = require('uuid');
const { generate } = require('shortid');
const { getWidgetById, createOrder, updateWidget } = require('../db/models');

module.exports = {
  placeOrder: async (parent, { input }) => {
    const widgets = input.widgets.map(({ id, quantity }) => ({
      id,
      quantity
    }));

    input.widgets.forEach(async ({ id, quantity }) => {
      const widget = await getWidgetById(id);
      await updateWidget(id, { quantity: widget.quantity - quantity });
    });

    const newOrder = {
      id: v1(),
      widgets,
      orderedDate: new Date(),
      orderNumber: generate()
    };

    return await createOrder(newOrder);
  }
};
