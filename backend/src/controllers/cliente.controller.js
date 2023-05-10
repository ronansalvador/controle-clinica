const customerService = require('../services/cliente.service');

const getAllCustomers = async (_req, res) => {
  const { type, message } = await customerService.findAll();

  return res.status(type).json(message);
};

const createCustomer = async (req, res) => {
  const { nome, cpf, telefone, endereco } = req.body;

  const { type, message } = await customerService.create({
    nome,
    cpf,
    telefone,
    endereco,
  });

  return res.status(type).json(message);
};

const findById = async (req, res) => {
  const { type, message } = await customerService.findById(req);

  return res.status(type).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone, endereco } = req.body;
  const { type, message } = await customerService.update({
    nome,
    cpf,
    telefone,
    endereco,
    id,
  });

  return res.status(type).json(message);
};

module.exports = {
  getAllCustomers,
  createCustomer,
  findById,
  update,
};
