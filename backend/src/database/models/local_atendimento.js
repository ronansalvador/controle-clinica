// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class LocalAtendimento extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   LocalAtendimento.init({
//     local: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'LocalAtendimento',
//   });
//   return LocalAtendimento;
// };

// ./models/localAtendimento.js
module.exports = (sequelize, DataTypes) => {
  const LocalAtendimento = sequelize.define('LocalAtendimento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    local: DataTypes.STRING,
  },{
    timestamps: false,
    tableName: 'local_atendimento',
    underscored: true,
  });

  LocalAtendimento.associate = ({ Sessao }) => {
    LocalAtendimento.hasMany(Sessao, { foreignKey: 'id_local_atendimento' });
  };

  return LocalAtendimento;
};
