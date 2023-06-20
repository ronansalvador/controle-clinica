import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../context/Context';
import validateEmail from '../helpers/validateEmail';
import saveLocalStorage from '../helpers/saveLocalStorage';

export default function Register() {
  const { setUser } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(false);
  const [loginWarning, setLoginWarning] = useState({});
  const navigate = useNavigate();

  // função que faz a validação dos inputs de name, email e senha e salva no estado
  const ValidateLogin = () => {
    const validEmail = validateEmail(email);
    const FIVE = 5;
    const ELEVEN = 11;

    setValidLogin(name.length > ELEVEN && validEmail && password.length > FIVE);
  };

  // Faz POST no back-end para validar registro, efetua login e redireciona ou salva mensagem de erro no estado
  const handleRegister = async () => {
    const data = { name, email, password };
    try {
      const response = await axios.post('http://localhost:3001/register', data);
      if ('message' in response) return setLoginWarning(response.data);
      saveLocalStorage('user', response.data);
      setUser(JSON.parse(localStorage.getItem('user')));
      // Após cadastro o usuário faz login automático e é redirecionado
      navigate('/sessions');
    } catch (error) {
      setLoginWarning(error.response.data);
    }
  };

  // Chama função de validação sempre que o name, Email ou Senha são alterados
  useEffect(() => {
    ValidateLogin();
  }, [name, email, password]);

  return (
    <div className='bg-stone-200 min-h-screen flex items-center justify-center'>
      {/* <img className="login-page-logo" src={ havingFun } alt="logo" /> */}
      <form className='bg-white px-16 py-12 rounded-2xl shadow-lg text-black w-100 flex flex-col'>
        <label className='flex flex-col' htmlFor='register_name'>
          Nome Completo
          <input
            className='w-full block bg-black rounded p-2 text-white'
            type='text'
            data-testid='common_register__input-name'
            id='register_name'
            placeholder='Seu nome'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label className='flex flex-col' htmlFor='register_email'>
          E-mail
          <input
            className='w-full block bg-black rounded p-2 text-white'
            type='text'
            data-testid='common_register__input-email'
            id='register_email'
            placeholder='seu-email@site.com'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>

        <label className='flex flex-col' htmlFor='register_password'>
          Senha
          <input
            className='w-full block bg-black rounded p-2 text-white'
            type='password'
            data-testid='common_register__input-password'
            id='register_password'
            placeholder='********'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>

        <div className='login-btn-container'>
          <button
            className='bg-blue-400 p-3 w-full mt-4 rounded-lg shadow hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-black'
            type='button'
            disabled={!validLogin}
            onClick={handleRegister}
          >
            CADASTRAR
          </button>

          <p
            className={`login-error ${
              !('message' in loginWarning) && 'hidden'
            }`}
            data-testid='common_register__element-invalid_register'
          >
            {loginWarning.message}
          </p>
        </div>
      </form>
    </div>
  );
}
