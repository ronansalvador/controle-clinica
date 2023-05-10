const { LocalAtendimento } = require('../database/models');

const getLocalService = async () => {
  const serviceLocal = await LocalAtendimento.findAll();

  return {type: 200, message: [...serviceLocal]}
}

module.exports = {
  getLocalService
};