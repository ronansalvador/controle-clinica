const express = require('express');

const localServiceController = require('../controllers/local_atendimento.controller');

const localServiceRoute = express.Router();

localServiceRoute.get('/', localServiceController.getLocalService);

module.exports = localServiceRoute;