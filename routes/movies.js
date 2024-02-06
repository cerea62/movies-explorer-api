const routerMovie = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

routerMovie.get('/movies', getMovies);
routerMovie.post('/movies', celebrates.validateMovieData, createMovie);
routerMovie.delete('/movies/:movieId', celebrates.validateMovieId, deleteMovie);

module.exports = routerMovie;
