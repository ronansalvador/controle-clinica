const express = require('express');

const paymentMethodController = require('../controllers/forma_pagamento.controller');

const paymentRoutes = express.Router();

paymentRoutes.get('/', paymentMethodController.getPaymentMethod);

module.exports = paymentRoutes;