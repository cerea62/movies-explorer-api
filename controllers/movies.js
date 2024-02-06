const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CREATED, OK } = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movie = await Movie.find({ owner });
    return res.status(OK).send(movie);
  } catch (error) {
    return next(error);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    return res.status(CREATED).send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }
    return next(error);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const owner = req.user._id;
    const movie = await Movie.findById(movieId)
      .orFail(() => new NotFoundError('Фильм с указанным id не найден'));
    if (movie.owner.toString() !== owner) {
      throw new ForbiddenError('Нет прав для удаления фильма');
    }
    const deletedMovie = await Movie.deleteOne(movie);
    return res.status(OK).send(deletedMovie);
  } catch (error) {
    return next(error);
  }
};
