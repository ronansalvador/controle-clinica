module.exports = (sequelize, DataTypes) => {
  const Sessao = sequelize.define(
    'Sessao',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      data: {
        type: DataTypes.DATEONLY,
      },
      valor: {
        type: DataTypes.DECIMAL,
      },
      numero_sessao: {
        type: DataTypes.INTEGER,
      },
      confirmacao_pagamento: {
        type: DataTypes.BOOLEAN,
      },
      data_pagamento: {
        type: DataTypes.DATEONLY,
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      id_tipo_atendimento: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      pacote_ativo: {
        type: DataTypes.BOOLEAN,
      },
      sessao_pacote: {
        type: DataTypes.INTEGER,
      },
      id_local_atendimento: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      id_forma_de_pagamento: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      sequelize,
      modelName: 'Sessao',
      tableName: 'sessao',
      timestamps: false,
    },
  );

  // Sessao.associate = (models) => {
  //   Sessao.belongsToMany(models.Sessao, {
  //     as: 'local_atendimento',
  //     through: Sessao,
  //     foreignKey: 'id_tipo_atendimento',
  //     otherKey: 'id',
  //   });
  //   Sessao.belongsToMany(models.Cliente, { foreignKey: 'id_cliente',  as: 'cliente'});
  //   Sessao.belongsToMany(models.TipoAtendimento, { foreignKey: 'id_tipo_atendimento' });
  //   Sessao.belongsToMany(models.LocalAtendimento, { foreignKey: 'id_local_atendimento' });
  //   Sessao.belongsToMany(models.FormaDePagamento, { foreignKey: 'id_forma_de_pagamento' });
  // };
  Sessao.associate = (models) => {
    Sessao.belongsTo(models.Cliente, {
      foreignKey: 'id_cliente',
      as: 'cliente',
    });
    Sessao.belongsTo(models.TipoAtendimento, {
      foreignKey: 'id_tipo_atendimento',
      as: 'tipo_atendimento',
    });
    Sessao.belongsTo(models.LocalAtendimento, {
      foreignKey: 'id_local_atendimento',
      as: 'local_atendimento',
    });
    Sessao.belongsTo(models.FormaPagamento, {
      foreignKey: 'id_forma_de_pagamento',
      as: 'forma_pagamento',
    });
  };

  return Sessao;
};
