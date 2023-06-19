import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';
import validateEmail from '../helpers/validateEmail';
import saveLocalStorage from '../helpers/saveLocalStorage';
import eye from '../images/eye.svg';
import eyeSlash from '../images/eye-slash.svg';

export default function Login() {
  const { setUser } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(false);
  const [loginWarning, setLoginWarning] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // função que faz a validação dos inputs de email e senha e salva no estado
  const ValidateLogin = () => {
    const validEmail = validateEmail(email);
    const FIVE = 5;

    setValidLogin(validEmail && password.length > FIVE);
  };

  // Faz POST no back-end para validar login, redireciona de acordo com a role ou salva mensagem de erro no estado
  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post('http://localhost:3001/login', data);
      if ('message' in response) return setLoginWarning(response.data);

      // navigate('/');
      await setUser(response.data);
      // Redireciona de acordo com a role
      saveLocalStorage('user', response.data);
      if (response.data.role === 'customer') {
        return navigate('/sessions');
      }
      if (response.data.role === 'seller') {
        return navigate('/seller/orders');
      }
      navigate('/admin/manage');
    } catch (error) {
      setLoginWarning(error.response.data);
    }
  };

  // Chama função de validação sempre que o Email ou Senha são alterados
  useEffect(() => {
    ValidateLogin();
  }, [email, password]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <form className='flex flex-col gap-20 h-360 justify-center p-10 w-300'>
        <label className='flex flex-col' htmlFor='login_email'>
          Login
          <input
            className='bg-green-200 p-2 rounded'
            type='text'
            data-testid='common_login__input-email'
            id='login_email'
            placeholder='seu-email@site.com'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>

        <label className='flex flex-col' htmlFor='login_password'>
          Senha
          <div className='relative'>
            <input
              className='bg-green-200 p-2 rounded'
              type={showPassword ? 'text' : 'password'}
              data-testid='common_login__input-password'
              id='login_password'
              placeholder={showPassword ? 'password' : '********'}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              className='absolute top-3 right-3'
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src={showPassword ? eye : eyeSlash} alt='showpassword' />
            </button>
          </div>
        </label>

        <div className='login-btn-container'>
          <p
            className={`login-error ${
              !('message' in loginWarning) && 'hidden'
            }`}
            data-testid='common_login__element-invalid-email'
          >
            {loginWarning.message}
          </p>
          <button
            type='button'
            disabled={!validLogin}
            data-testid='common_login__button-login'
            onClick={handleLogin}
          >
            Login
          </button>

          <button type='button' data-testid='common_login__button-register'>
            <Link to='/register'>Ainda não tenho conta</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
