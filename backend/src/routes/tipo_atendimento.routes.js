const express = require('express');

const serviceTypeController = require('../controllers/tipo_atendimento.controller');

const serviceTypeRoutes = express.Router();

serviceTypeRoutes.get('/', serviceTypeController.getServiceType);

module.exports = serviceTypeRoutes;