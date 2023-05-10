module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('local_atendimento', [
      {
        id: 1,
        local: 'Domicilio',
        
      },
      {
        id: 2,
        local: 'Paulista',
        
      },
      {
        id: 3,
        local: 'Imbativel',
        
      },
      {
        id: 4,
        local: 'SP',
        
      }
    ], {timestamps: false});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('local_atendimento', null, {});
  }
};