// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class FormaPagamento extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   FormaPagamento.init({
//     nome: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'FormaPagamento',
//   });
//   return FormaPagamento;
// };

// ./models/formaPagamento.js
module.exports = (sequelize, DataTypes) => {
  const FormaPagamento = sequelize.define('FormaPagamento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'FormaPagamento',
    tableName: 'forma_pagamento',
    timestamps: false
  });

  FormaPagamento.associate = ({ Sessao }) => {
    FormaPagamento.hasMany(Sessao, { foreignKey: 'id_forma_de_pagamento' });
  };

  return FormaPagamento;
};
