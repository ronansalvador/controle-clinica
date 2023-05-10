const { joiSchemaLogin } = require('./validate.schema');

const validateLogin = async (user) => {
  const { error, value } = joiSchemaLogin.validate(user);

  if (error) {
    return { type: 404, message: { message: 'Login inválido' } };
  }
  return { type: null, message: value };
};

module.exports = {
  validateLogin,
};
