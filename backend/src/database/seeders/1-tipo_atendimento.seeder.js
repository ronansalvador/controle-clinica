module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipo_atendimento', [
      {
        id: 1,
        nome: 'Avaliação',
        
      },
      {
        id: 2,
        nome: 'Retorno',
        
      },
      {
        id: 3,
        nome: 'Pacote',
        
      }
    ], {timestamps: false});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipo_atendimento', null, {});
  }
};