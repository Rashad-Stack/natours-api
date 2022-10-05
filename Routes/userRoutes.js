const express = require('express');
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require('./../controller/userController');

const Router = express.Router();

Router.route('/').get(getAllUsers).post(createUser);
Router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = Router;
