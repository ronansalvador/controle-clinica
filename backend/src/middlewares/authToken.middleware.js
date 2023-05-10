const fs = require('fs');
const jwt = require('../utils/jwtConfig');

// const keySecret = fs.readFileSync('jwt.evaluation.key');
const keySecret = 'JWT_secret';
const routesValidateToken = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }

  const validateSignature = jwt.validateToken(authorization, keySecret);

  if (validateSignature.type === 401) {
    return response
      .status(validateSignature.type)
      .json(validateSignature.message);
  }
  next();
};

module.exports = { routesValidateToken };
