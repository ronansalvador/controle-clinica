module.exports = (sequelize, DataTypes) => {
  const TipoAtendimento = sequelize.define('TipoAtendimento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: DataTypes.STRING,
  },{
    sequelize,
    modelName: 'TipoAtendimento',
    tableName: 'tipo_atendimento',
    timestamps: false
  });

  TipoAtendimento.associate = (models) => {
    TipoAtendimento.hasMany(models.Sessao, { foreignKey: 'id_tipo_atendimento', as: 'tipo_atendimento' });
  };

  return TipoAtendimento;
};
