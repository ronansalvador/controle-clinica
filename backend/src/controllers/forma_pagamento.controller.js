const paymentMethodService = require('../services/forma_pagamento.service')

const getPaymentMethod = async (_req, res) => {
  const {type, message} = await paymentMethodService.getPaymentMethod();

  return res.status(type).json(message);

}

module.exports = { 
  getPaymentMethod,
};
