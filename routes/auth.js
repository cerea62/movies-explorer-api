const routerAuth = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  createUser, login,
} = require('../controllers/users');

routerAuth.post('/signup', celebrates.validateUserData, createUser);
routerAuth.post('/signin', celebrates.validateLogin, login);

module.exports = routerAuth;
