const { User } = require('../database/models');
const decryptMD5 = require('../utils/decyptConfig');
const jwt = require('../utils/jwtConfig');

const register = async ({ name, email, password, role = 'customer' }) => {
  // Busca o compo "email" no banco de dados, retornando o email e tudo que está relacionado a ele.
  const loginValidate = await User.findOne({ where: { email, name }, raw: true });

  if (loginValidate) {
    return { type: 409, message: { message: 'Usuário já existe' } };
  }

  // Encripta a senha do usuário.
  const decrypt = decryptMD5.createHash(password);

  // Cadastra o usuário no banco de dados.
  const newUser = await User.create({ name, email, password: decrypt, role });
  
  // Remove a senha do usuário, para gerar o token.
  const { password: _, ...userWithoutPassword } = newUser.dataValues;
  
  // Função que gera o token.
  const token = jwt.newToken(userWithoutPassword);

  // Retorna as informações informações do usuario, caso o login seja feito com sucesso.
  const { id } = newUser.dataValues; 
  return { type: 201, message: { id, name, email, role, token } };
};

module.exports = { register };
