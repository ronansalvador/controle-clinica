const express = require('express');
const cors = require('cors');
const routers = require('../routes/routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routers);
app.get('/coffee', (_req, res) => res.status(418).end());

// disponibiliza a pasta public para conseguir acessar as imagens via requisição da API
app.use(express.static('public'));

module.exports = app;
