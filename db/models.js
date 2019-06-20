const axios = require('axios');
const { dataApi } = require('../constants');

const searchWidgets = ({ size, name, category }) => {
  let queryStrings = [];
  if (size) {
    queryStrings.push(`size=${size}`);
  }

  if (name) {
    queryStrings.push(`name_like=${name}`);
  }

  if (category) {
    queryStrings.push(`category.id=${category.id}`);
  }

  queryStrings.push('_sort=amount&_order=desc');

  console.log(`${dataApi}/widgets?${queryStrings.join('&')}`)
  return axios.get(`${dataApi}/widgets?${queryStrings.join('&')}`).then(res => res.data);
};
const getWidgets = () => axios.get(`${dataApi}/widgets`).then(res => res.data);
const getWidgetById = id =>
  axios.get(`${dataApi}/widgets/${id}`).then(res => res.data);
const createWidget = data =>
  axios.post(`${dataApi}/widgets`, data).then(res => res.data);
const deleteWidget = id =>
  axios.delete(`${dataApi}/widgets/${id}`).then(() => ({ id }));
const updateWidget = (id, data) =>
  axios.patch(`${dataApi}/widgets/${id}`, data).then(res => res.data);

const getCategories = () =>
  axios.get(`${dataApi}/categories`).then(res => res.data);
const getCategoryById = id =>
  axios.get(`${dataApi}/categories/${id}`).then(res => res.data);
const createCategory = data =>
  axios.post(`${dataApi}/categories`, data).then(res => res.data);
const deleteCategory = data =>
  axios.delete(`${dataApi}/categories/${id}`).then(res => res.data);
const updateCategory = (id, data) =>
  axios.patch(`${dataApi}/categories/${id}`, data).then(res => res.data);

const getOrders = () => axios.get(`${dataApi}/orders`).then(res => res.data);
const getOrderByOrderNumber = orderNumber =>
  axios
    .get(`${dataApi}/orders?orderNumber=${orderNumber}`)
    .then(res => res.data[0]);
const createOrder = data =>
  axios.post(`${dataApi}/orders`, data).then(res => res.data);

module.exports = {
  searchWidgets,
  getWidgets,
  getWidgetById,
  createWidget,
  deleteWidget,
  updateWidget,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getOrders,
  getOrderByOrderNumber,
  createOrder
};
