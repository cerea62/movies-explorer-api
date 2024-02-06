const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { IS_URL } = require('../utils/constants');

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}, { abortEarly: false });

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(IS_URL).required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    CardId: Joi.objectId(),
  }),
});

const validateDataCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(IS_URL),
  }),
}, { abortEarly: false });

const validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(IS_URL),
  }),
}, { abortEarly: false });

module.exports = {
  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,
  validateCardId,
  validateDataCard,
  validateUserData,
};
