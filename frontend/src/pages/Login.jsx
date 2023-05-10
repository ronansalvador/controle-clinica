import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';
import validateEmail from '../helpers/validateEmail';
import saveLocalStorage from '../helpers/saveLocalStorage';
import eye from '../images/eye.svg';
import eyeSlash from '../images/eye-slash.svg';
import './Login.css';

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
    <div className='login-page'>
      <form className='login-form'>
        <label htmlFor='login_email'>
          Login
          <input
            type='text'
            data-testid='common_login__input-email'
            id='login_email'
            placeholder='seu-email@site.com'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>

        <label htmlFor='login_password' className='login-password-label'>
          Senha
          <input
            type={showPassword ? 'text' : 'password'}
            data-testid='common_login__input-password'
            id='login_password'
            placeholder={showPassword ? 'password' : '********'}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            className='toggle-password-btn'
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img src={showPassword ? eye : eyeSlash} alt='showpassword' />
          </button>
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
            className='login-btn'
            disabled={!validLogin}
            data-testid='common_login__button-login'
            onClick={handleLogin}
          >
            Login
          </button>

          <button
            type='button'
            className='register-btn'
            data-testid='common_login__button-register'
          >
            <Link to='/register'>Ainda não tenho conta</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
