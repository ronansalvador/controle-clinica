module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'cliente',
      [
        {
          nome: 'Ronan Fernando Salvador',
          cpf: '38533151861',
          telefone: '11994963639',
          endereco: 'Rua do Ronan, 123',
        },
        {
          nome: 'Thaís Bonfim Clemente',
          cpf: '987654321',
          telefone: '11992969736',
          endereco: 'Rua da Thais, 123',
        },
      ],
      { timestamps: false },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cliente', null, {});
  },
};
