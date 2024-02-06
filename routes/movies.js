const routerMovie = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

routerMovie.get('/movies', getMovies);
routerMovie.post('/movies', createMovie);
routerMovie.delete('/movies/:movieId', deleteMovie)

module.exports = routerMovie;
