module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('forma_pagamento', [
      {
        id: 1,
        nome: 'Dinheiro',
        
      },
      {
        id: 2,
        nome: 'Bradesco',
        
      },
      {
        id: 3,
        nome: 'Itau',
        
      },
      {
        id: 4,
        nome: 'Inter',
        
      },
      {
        id: 5,
        nome: 'Cheque',
        
      },
      {
        id: 6,
        nome: 'MercadoPago',
        
      },
    ], {timestamps: false});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('forma_pagamento', null, {});
  }
};