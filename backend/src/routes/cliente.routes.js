const express = require('express');

const customerController = require('../controllers/cliente.controller');

const customerRoute = express.Router();

customerRoute.get('/', customerController.getAllCustomers);
customerRoute.get('/gerar', customerController.gerarArquivo);
customerRoute.get('/:id', customerController.findById);
customerRoute.post('/', customerController.createCustomer);
customerRoute.put('/:id', customerController.update);

module.exports = customerRoute;
