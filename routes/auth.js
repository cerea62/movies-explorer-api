const routerAuth = require('express').Router();

const {
  createUser, login,
} = require('../controllers/users');

routerAuth.post('/signup', createUser);
routerAuth.post('/signin', login);

module.exports = routerAuth;
