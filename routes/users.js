const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/userController');
const UserService = require('./../services/userService');

const UserInstance = new UserController(new UserService());

//Muestra una lista de usuarios, no tiene restricciones de acceso.
router.get('/', function(req, res, next) {
  UserInstance.getUsers(req, res);
});

//Sirve para crear un usuario en la base de datos, no tiene restricciones de acceso.
router.post('/', function(req, res, next) {
  UserInstance.postUsers(req, res);
});

//Muestra la información de un usuario particular, no tiene restricciones de acceso.
router.get('/:id', function(req, res, next) {
  UserInstance.getUsersId(req, res);
});

// Sirve para modificar un usuario en la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.put('/edit/:id', function(req, res, next){
  UserInstance.putUsers(req, res);
});

//Sirve para borrar un usuario de la base de datos. Necesita estar autenticado y ser admin para que se ejecute.
router.delete('/delete/:id', function(req, res, next){
  UserInstance.deleteUsers(req, res);
});

module.exports = router;