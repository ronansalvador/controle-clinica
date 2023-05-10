const crypto = require('crypto');

// Função que encripta a senha do usuário em MD5.
const createHash = (password) => {
  const newHash = crypto.createHash('md5').update(password).digest('hex');
  
  return newHash;
};

// Função que desencripta senha do banco de dados.
const compareHash = (password, originalHash) => {
  const newHash = crypto.createHash('md5').update(password).digest('hex');
  
  return newHash === originalHash;
};
module.exports = { compareHash, createHash };
