'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.DATEONLY,
      },
      valor: {
        type: Sequelize.DECIMAL,
      },
      numero_sessao: {
        type: Sequelize.INTEGER,
      },
      confirmacao_pagamento: {
        type: Sequelize.BOOLEAN,
      },
      data_pagamento: {
        type: Sequelize.DATEONLY,
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cliente',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_tipo_atendimento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipo_atendimento',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pacote_ativo: {
        type: Sequelize.BOOLEAN,
      },
      sessao_pacote: {
        type: Sequelize.INTEGER,
      },
      id_local_atendimento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'local_atendimento',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_forma_de_pagamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'forma_pagamento',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sessao');
  },
};
