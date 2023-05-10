const serviceTypeService = require('../services/tipo_atendimento.service')

const getServiceType = async (_req, res) => {
  const {type, message} = await serviceTypeService.getServiceType();

  return res.status(type).json(message);

}

module.exports = { 
  getServiceType,
};
