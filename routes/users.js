const routerUser = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getUser, updateUser,
} = require('../controllers/users');

routerUser.get('/users/me', getUser);
routerUser.patch('/users/me', celebrates.validateUpdateUser, updateUser);

module.exports = routerUser;
