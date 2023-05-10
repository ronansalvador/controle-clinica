const express = require('express');
const registerController = require('../controllers/register.controller');

const registerRoutes = express.Router();

registerRoutes.post('/', registerController.registerNewUser);

module.exports = registerRoutes;