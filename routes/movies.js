const express = require('express');
const router = express.Router();
const MovieController = require('./../controllers/movieController');
const MovieService = require('./../services/movieService');
const multer = require('multer');
const checkAdmin = require('../utils/checkAdmin');

const MovieInstance = new MovieController(new MovieService());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png');
  }
});

const upload = multer({storage: storage});
//Muestra un array con todas las películas. Solo se puede acceder autenticado.
router.get('/', function (req, res, next) {
  MovieInstance.getMovies(req, res);
});

//Sirve para crear una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.post('/', upload.single('image'), checkAdmin, function (req, res, next) {
  MovieInstance.postMovies(req, res);
});

//Muestra la información de una película especīfica. Solo se puede acceder autenticado.
router.get('/:id', function (req, res, next) {
  MovieInstance.getMoviesId(req, res);
});

//Sirve para modificar una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.put('/edit/:id', upload.single('image'), checkAdmin, function (req, res, next) {
  MovieInstance.putMovies(req, res);
});

//Sirve para borrar una película de la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.delete('/delete/:id', checkAdmin, function (req, res, next) {
  MovieInstance.deleteMovies(req, res);
});

module.exports = router;