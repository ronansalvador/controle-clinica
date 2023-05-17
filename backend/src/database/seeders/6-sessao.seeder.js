module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'sessao',
      [
        {
          data: '2023-05-17',
          valor: 50.0,
          numero_sessao: 1,
          confirmacao_pagamento: true,
          data_pagamento: '2023-05-17',
          id_cliente: 2,
          id_tipo_atendimento: 1,
          pacote_ativo: true,
          sessao_pacote: 1,
          id_local_atendimento: 1,
          id_forma_de_pagamento: 1,
        },
        {
          data: '2023-05-17',
          valor: 50.0,
          numero_sessao: 1,
          confirmacao_pagamento: true,
          data_pagamento: '2023-05-17',
          id_cliente: 1,
          id_tipo_atendimento: 1,
          pacote_ativo: true,
          sessao_pacote: 1,
          id_local_atendimento: 1,
          id_forma_de_pagamento: 1,
        },
        {
          data: '2023-04-10',
          valor: 50.0,
          numero_sessao: 1,
          confirmacao_pagamento: true,
          data_pagamento: '2023-04-10',
          id_cliente: 2,
          id_tipo_atendimento: 1,
          pacote_ativo: true,
          sessao_pacote: 1,
          id_local_atendimento: 1,
          id_forma_de_pagamento: 1,
        },
        {
          data: '2023-04-10',
          valor: 50.0,
          numero_sessao: 1,
          confirmacao_pagamento: true,
          data_pagamento: '2023-04-10',
          id_cliente: 1,
          id_tipo_atendimento: 1,
          pacote_ativo: true,
          sessao_pacote: 1,
          id_local_atendimento: 1,
          id_forma_de_pagamento: 1,
        },
      ],
      { timestamps: false },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sessao', null, {});
  },
};
