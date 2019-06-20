const { addWidget, removeWidget, updateWidget } = require('./widgets');
const { placeOrder } = require('./orders');
const { addCategory, removeCategory, updateCategory } = require('./categories');

module.exports = {
  addWidget,
  removeWidget,
  updateWidget,
  addCategory,
  removeCategory,
  updateCategory,
  placeOrder,
};
