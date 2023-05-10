const sessionService = require('../services/sessao.service');

const getAllSession = async (_req, res) => {
  const { type, message } = await sessionService.findAll();

  return res.status(type).json(message);
};

const createSession = async (req, res) => {
  const {
    data,
    id_cliente,
    id_tipo_atendimento,
    id_local_atendimento,
    valor,
    numero_sessao,
    id_forma_de_pagamento,
    confirmacao_pagamento,
    data_pagamento,
    pacote_ativo,
    sessao_pacote,
  } = req.body;

  const { type, message } = await sessionService.create({
    data,
    id_cliente,
    id_tipo_atendimento,
    id_local_atendimento,
    valor,
    numero_sessao,
    id_forma_de_pagamento,
    confirmacao_pagamento,
    data_pagamento,
    pacote_ativo,
    sessao_pacote,
  });

  return res.status(type).json(message);
};

const findById = async (req, res) => {
  const { type, message } = await sessionService.findById(req);

  return res.status(type).json(message);
};

const updateSession = async (req, res) => {
  const { id } = req.params;
  const {
    data,
    id_cliente,
    id_tipo_atendimento,
    id_local_atendimento,
    valor,
    numero_sessao,
    id_forma_de_pagamento,
    confirmacao_pagamento,
    data_pagamento,
    pacote_ativo,
    sessao_pacote,
  } = req.body;

  const { type, message } = await sessionService.updateSession({
    data,
    id_cliente,
    id_tipo_atendimento,
    id_local_atendimento,
    valor,
    numero_sessao,
    id_forma_de_pagamento,
    confirmacao_pagamento,
    data_pagamento,
    pacote_ativo,
    sessao_pacote,
    id,
  });

  return res.status(type).json(message);
};

// const createCustomer = async (req, res) => {

//   const {type, message} = await sessionService.create(req.body);

//   return res.status(type).json(message);

// }

// const findById = async (req, res) => {

//   const {type, message} = await sessionService.findById(req);

//   return res.status(type).json(message);

// }

module.exports = {
  getAllSession,
  createSession,
  findById,
  updateSession,
  // createCustomer,
  // findById
};
