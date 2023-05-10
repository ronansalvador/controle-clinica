const jwt = require('jsonwebtoken');
const fs = require('fs');

// const keySecret = fs.readFileSync('jwt.evaluation.key');
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const newToken = (data) => {
  const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  try {
    const validate = jwt.verify(token, JWT_SECRET);
    return { type: null, validate };
  } catch (error) {
    return { type: 401, message: { message: 'Token deve ser válido' } };
  }
};

module.exports = {
  newToken,
  validateToken,
};
