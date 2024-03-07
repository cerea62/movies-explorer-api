const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const AccessError = require('../errors/AccessError');
const NotFoundError = require('../errors/NotFoundError');
const { CREATED, OK, MONGO_DUPLICATE_ERROR } = require('../utils/constants');

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!password) {
      throw new ValidationError('Поле "Пароль" не заполнено');
    }
    const hash = await bcrypt.hash(password, 10);
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new ConflictError('Такой пользователь уже существует'));
    }
    const user = User.create({ email, password: hash, name });
    return res.status(CREATED).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR) {
      return next(new ConflictError('Такой пользователь уже существует'));
    }
    if (error.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }
    return next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')
      .orFail(new AccessError('Неправильные имя пользователя или пароль'));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new AccessError('Неверный пароль!');
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    return res.status(OK).send({
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(() => new NotFoundError('Пользователь по указанному ID не найден'));
    return res.status(OK).send(user);
  } catch (error) {
    return next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
      .orFail(() => new NotFoundError('Пользователь по указанному ID не найден'));
    return res.status(OK).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ValidationError('Передан некорректный Id'));
    }
    return next(error);
  }
};
