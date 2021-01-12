const express = require('express');
const router = express.Router();
const MovieController = require('./../controllers/movieController');
const MovieService = require('./../services/movieService');

const MovieInstance = new MovieController(new MovieService());

//Muestra un array con todas las películas. Solo se puede acceder autenticado.
router.get('/', function(req, res, next) {
  
});

//Sirve para crear una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.post('/', function(req, res, next) {

});

//Muestra la información de una película especīfica. Solo se puede acceder autenticado.
router.get('/:id', function(req, res, next) {

});

//Sirve para modificar una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.put('/edit/:id', function(req, res, next) {

});

//Sirve para borrar una película de la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.delete('/delete/:id', function(req, res, next) {

});

module.exports = router;