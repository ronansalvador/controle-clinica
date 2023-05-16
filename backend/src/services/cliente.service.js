// arquivo clientesController.js

const { Cliente } = require('../database/models');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Create - Cria um novo cliente
const create = async ({ nome, cpf, telefone, endereco }) => {
  if (nome.length === 0) {
    return {
      type: 500,
      message: 'Erro ao criar cliente: o nome não pode ser vazio!',
    };
  }
  try {
    const cliente = await Cliente.create({ nome, cpf, telefone, endereco });
    // res.status(201).json(cliente);
    return { type: 201, message: [cliente] };
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Erro ao criar cliente.' });
    return { type: 500, message: 'Erro ao criar cliente.' };
  }
};

// Read - Lista todos os clientes
const findAll = async () => {
  try {
    const clientes = await Cliente.findAll();
    // res.status(200).json(clientes);
    return { type: 200, message: [...clientes] };
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Erro ao buscar clientes.' });
    return { type: 500, message: 'Erro ao criar cliente.' };
  }
};

const gerarArquivo = async () => {
  console.log('service');
  const clientes = await Cliente.findAll();
  const csvWriter = createCsvWriter({
    path: '../frontend/public/arquivo.csv',
    header: [
      // Defina os nomes das colunas do CSV com base nas colunas da tabela do banco de dados
      { id: 'id', title: 'ID' },
      { id: 'nome', title: 'Nome' },
      { id: 'cpf', title: 'CPF' },
      // Adicione mais colunas conforme necessário
    ],
  });

  // Converte os resultados em um formato adequado para o CSV
  const csvData = clientes.map((row) => ({
    id: row.id,
    nome: row.nome,
    cpf: row.cpf,
    // Mapeie mais colunas conforme necessário
  }));

  csvWriter
    .writeRecords(csvData)
    .then(() => ({ type: 200, message: 'arquivo gerado com sucesso' }))
    .catch((error) => ({ type: 404, message: 'erro ao gerar arquivo' }))
    .finally(() => {
      // Encerre a conexão com o banco de dados após gerar o arquivo CSV
      // connection.end();
      return { type: 200, message: 'Ronan' };
    });

  return { type: 200, message: 'Ronan' };
};

// Read - Busca um cliente por ID
const findById = async (req) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      // return res.status(404).json({ message: 'Cliente não encontrado.' });
      return { type: 404, message: 'Cliente não encontrado.' };
    }
    // res.status(200).json(cliente);
    return { type: 200, message: [cliente] };
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Erro ao buscar cliente.' });
    return { type: 500, message: 'Erro ao buscar cliente.' };
  }
};

// Update - Atualiza um cliente existente
const update = async ({ nome, cpf, telefone, endereco, id }) => {
  try {
    // const { id } = req.params;
    // const { nome, cpf, telefone, endereco } = req.body;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      // return res.status(404).json({ message: 'Cliente não encontrado.' });
      return { type: 404, message: 'Cliente não encontrado.' };
    }

    const editCliente = { nome, cpf, telefone, endereco };

    await cliente.update(editCliente, { where: { id: id } });
    // res.status(200).json(cliente);
    return { type: 200, message: [cliente] };
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Erro ao atualizar cliente.' });
    return { type: 500, message: 'Erro ao atualizar cliente.' };
  }
};

// Delete - Remove um cliente existente
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      // return res.status(404).json({ message: 'Cliente não encontrado.' });
      return { type: 404, message: 'Cliente não encontrado.' };
    }
    await cliente.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover cliente.' });
    return { type: 500, message: 'Erro ao remover cliente.' };
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  gerarArquivo,
};
