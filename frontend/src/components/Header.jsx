import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Context from '../context/Context';

function Header() {
  const { handleLogout } = useContext(Context);
  return (
    <header className='menu'>
      <Link to='/' className='title'>
        {/* <img src='' alt='Controle Clinica' /> */}
        <h1>Controle Clinica</h1>
      </Link>
      <ul>
        <li>
          <Link to='/customer'>Clientes</Link>
        </li>
        <li>
          <Link to='/addsession'>Adicionar Sessão</Link>
        </li>
        <li>
          <Link to='/addsession'>Relatórios</Link>
        </li>
        <li>
          <Link to='/sessions'>Consultas</Link>
        </li>
        <li>
          <Link id='btn-logout' to='/' onClick={handleLogout}>
            Sair
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
