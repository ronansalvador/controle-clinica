module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
    },
    cpf: {
      type: DataTypes.STRING,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.STRING,
    }
  },{
    sequelize,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false
  });

  Cliente.associate = (models) => {
    Cliente.hasMany(models.Sessao, { foreignKey: 'id_cliente', as: 'cliente' });

}

  return Cliente;
};
