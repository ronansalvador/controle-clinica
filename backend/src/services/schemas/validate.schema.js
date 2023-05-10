const joi = require('joi');

const joiSchemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = {
  joiSchemaLogin,
};
