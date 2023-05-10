// Recebe um email e retorna True caso esteja em um formato válido e False caso não
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email);
};

export default validateEmail;
