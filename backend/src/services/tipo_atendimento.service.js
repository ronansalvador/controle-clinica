const { TipoAtendimento } = require('../database/models');

const getServiceType = async () => {
  const serviceType = await TipoAtendimento.findAll();

  return {type: 200, message: [...serviceType]}
}

module.exports = {
  getServiceType
};