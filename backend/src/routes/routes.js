const express = require('express');
const paymentRoutes = require('./forma_pagamento.routes');
const serviceTypeRoute = require('./tipo_atendimento.routes');
const localServiceRoute = require('./local_atendimento.routes');
const customerRoute = require('./cliente.routes');
const sessionRoute = require('./sessao.routes');
const registerRoute = require('./register.routes');
const loginRoute = require('./login.routes');

const { routesValidateToken } = require('../middlewares/authToken.middleware');

const routes = express.Router();

routes.use('/paymentMethod', routesValidateToken, paymentRoutes);
routes.use('/serviceType', routesValidateToken, serviceTypeRoute);
routes.use('/localService', routesValidateToken, localServiceRoute);
routes.use('/customer', routesValidateToken, customerRoute);
routes.use('/session', routesValidateToken, sessionRoute);
routes.use('/register', registerRoute);
routes.use('/login', loginRoute);

module.exports = routes;
