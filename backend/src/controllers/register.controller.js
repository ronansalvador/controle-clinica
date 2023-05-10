const registerService = require('../services/register.service');

const registerNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { type, message } = await registerService.register({ name, email, password, role });
  
  return res.status(type).json(message);
};

module.exports = { 
  registerNewUser };