const { FormaPagamento } = require('../database/models');

const getPaymentMethod = async () => {
  const paymentMethod = await FormaPagamento.findAll();

  return {type: 200, message: [...paymentMethod]}
}

module.exports = {
  getPaymentMethod
};