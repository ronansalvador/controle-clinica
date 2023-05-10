const { User } = require('../database/models');
const decryptMD5 = require('../utils/decyptConfig');
const joi = require('./schemas/validate.input');
const jwt = require('../utils/jwtConfig');

const login = async ({ email, password }) => {
  // Valida se o input email e senha é estruturado da forma correta.
  const error = joi.validateLogin(email, password);

  if (error.type) {
    return error;
  }
  
  // Busca o compo "email" no banco de dados, retornando o email e tudo que está relacionado a ele.
  const emailValidate = await User.findOne({ where: { email }, raw: true });

  if (!emailValidate) {
    return { type: 404, message: { message: 'Email ou senha incorretos' } };
  }

  // Hash armazenada no banco de dados.
  const hashOriginal = emailValidate.password;

  // Função que compara a senha do input com a original do banco de dados.
  const decrypt = decryptMD5.compareHash(password, hashOriginal);
  if (decrypt !== true) {
    return { type: 404, message: { message: 'Email ou senha incorretos' } };
  }

  // Remove a senha do usuário, para gerar o token.
  const { password: _, ...userWithoutPassword } = emailValidate;

  // Função que gera o token.
  const token = jwt.newToken(userWithoutPassword);

  // Retorna as informações informações do usuario, caso o login seja feito com sucesso.
  const { id, name, role } = emailValidate;
  return { type: 200, message: { id, name, email, role, token } };
};

module.exports = { login };
