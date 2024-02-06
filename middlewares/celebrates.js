const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { IS_URL } = require('../utils/constants');

// const validURL = (message) => (value, helpers) => {
//   if (isUrl(value)) return value;
//   return helpers.message(message);
// };

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}, { abortEarly: false });

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}, { abortEarly: false });

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, { abortEarly: false });

module.exports.validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(IS_URL).required(),
    trailerLink: Joi.string().regex(IS_URL).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().regex(IS_URL).required(),
    movieId: Joi.number().required(),
  }),
}, { abortEarly: false });

module.exports.validateMovieId = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}, { abortEarly: false });

