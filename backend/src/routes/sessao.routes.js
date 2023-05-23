const express = require('express');

const sessionController = require('../controllers/sessao.controller');

const sessionRoute = express.Router();

sessionRoute.get('/', sessionController.getAllSession);
sessionRoute.get('/:id', sessionController.findById);
sessionRoute.post('/', sessionController.createSession);
sessionRoute.put('/:id', sessionController.updateSession);
sessionRoute.get('/byuser/:id', sessionController.findByUser);
sessionRoute.get('/lastsession/:id', sessionController.lastSession);

module.exports = sessionRoute;
