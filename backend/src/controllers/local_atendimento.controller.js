const localService = require('../services/local_atendimento.service')
const getLocalService = async (_req, res) => {
  const {type, message} = await localService.getLocalService();

  return res.status(type).json(message);

}

module.exports = { 
  getLocalService,
};
