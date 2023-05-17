module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Ronan Salvador',
          email: 'ronan@teste.com',
          password: 'e10adc3949ba59abbe56e057f20f883e',
          role: 'customer',
        },
      ],
      { timestamps: false },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
