const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const IS_URL = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s!"#'()*+,:;<>@[\\\]`{|}~]*$/;

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => IS_URL.test(url),
        message: 'Некорректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => IS_URL.test(url),
        message: 'Некорректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => IS_URL.test(url),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,

    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
