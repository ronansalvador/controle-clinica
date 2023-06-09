// arquivo sessaoController.js

const { Sessao } = require('../database/models');
// Create - Cria uma nova sessão
async function create({
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
}) {
  try {
    const sessao = await Sessao.create({
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
    return { type: 201, message: [sessao] };
  } catch (error) {
    console.error(error);
    console.error('mensagem', error.message);
    return { type: 500, message: 'Erro ao criar sessao.' };
  }
}

// Read - Lista todas as sessões
async function findAll() {
  const sessoes = await Sessao.findAll({
    include: [
      'cliente',
      'tipo_atendimento',
      'local_atendimento',
      'forma_pagamento',
    ],
  });

  return { type: 200, message: [...sessoes] };
  // try {
  //   const sessoes = await Sessao.findAll({
  //     include: ['cliente', 'tipoAtendimento', 'localAtendimento', 'formaPagamento']
  //   });

  //   // res.status(200).json(sessoes);
  //   return {type: 200, message: [...sessoes]};
  // } catch (error) {

  //   // res.status(500).json({ message: 'Erro ao buscar sessões.' });
  //   return {type: 500, message: { message: 'Erro ao buscar sessões.' }};
  // }
}

// Read - Busca uma sessão por ID
async function findById(req, res) {
  try {
    const { id } = req.params;
    const sessao = await Sessao.findByPk(id, {
      include: [
        'cliente',
        'tipo_atendimento',
        'local_atendimento',
        'forma_pagamento',
      ],
    });
    if (!sessao) {
      return res.status(404).json({ message: 'Sessão não encontrada.' });
    }
    // res.status(200).json(sessao);
    return { type: 200, message: [sessao] };
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Erro ao buscar sessão.' });
    return { type: 500, message: 'Erro ao buscar sessao.' };
  }
}

const updateSession = async ({
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
}) => {
  try {
    // const { id } = req.params;
    // const { nome, cpf, telefone, endereco } = req.body;
    const sessao = await Sessao.findByPk(id);

    if (!sessao) {
      // return res.status(404).json({ message: 'Cliente não encontrado.' });
      return { type: 404, message: 'sessao não encontrado.' };
    }

    const editSession = {
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
    };

    await Sessao.update(editSession, { where: { id: id } });
    // res.status(200).json(cliente);
    return { type: 200, message: [sessao] };
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Erro ao atualizar cliente.' });
    return { type: 500, message: 'Erro ao atualizar sessao.' };
  }
};

async function findByUser(userId) {
  const sessoes = await Sessao.findAll({
    where: {
      id_cliente: userId,
    },
    include: [
      'cliente',
      'tipo_atendimento',
      'local_atendimento',
      'forma_pagamento',
    ],
  });

  return { type: 200, message: [...sessoes] };
}

async function lastSession(userId) {
  const sessoes = await Sessao.findOne({
    where: {
      id_cliente: userId,
    },
    order: [['data', 'DESC']],
    include: [
      'cliente',
      'tipo_atendimento',
      'local_atendimento',
      'forma_pagamento',
    ],
  });
  // const sessoes = await Sessao.findAll({
  //   where: {
  //     id_cliente: userId,
  //   },
  //   order: [['data', 'DESC']],
  //   include: [
  //     'cliente',
  //     'tipo_atendimento',
  //     'local_atendimento',
  //     'forma_pagamento',
  //   ],
  // });

  console.log('teste', sessoes);

  return { type: 200, message: sessoes };
}

module.exports = {
  create,
  findAll,
  findById,
  updateSession,
  findByUser,
  lastSession,
};
