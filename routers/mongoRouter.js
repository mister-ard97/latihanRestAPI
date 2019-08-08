var express = require('express');
var router= express.Router();
const { moviesController } = require('../controllers');

router.get('/movies', moviesController.getMovies);
router.get('/movies/:id', moviesController.getMoviesById);
router.post('/movies', moviesController.addMovies);
router.put('/movies/:id', moviesController.editMovieById);
router.delete('/movies/:id', moviesController.deleteMovieById);
router.delete('/moviestitle', moviesController.deleteMovie);

module.exports = router;