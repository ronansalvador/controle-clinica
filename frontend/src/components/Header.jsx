import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

function Header() {
  const { handleLogout } = useContext(Context);

  return (
    <>
      <header className='bg-blue-400 h-full'>
        <nav className='flex items-center justify-between h-20'>
          <div className='w-1/6 text-center'>
            <Link
              to='/'
              className='hover:text-white hover:bg-blue-900 h-20 flex items-center justify-center'
            >
              {/* <img src='' alt='Controle Clinica' /> */}
              <h1>Controle Clinica</h1>
            </Link>
          </div>
          <ul className='flex text-center w-5/6 justify-evenly'>
            <li className='w-full'>
              <Link
                className='hover:text-white hover:bg-blue-900 h-20 flex items-center justify-center'
                to='/customer'
              >
                Clientes
              </Link>
            </li>
            <li className='w-full'>
              <Link
                className='hover:text-white hover:bg-blue-900 h-20 flex items-center justify-center'
                to='/addsession'
              >
                Adicionar Sessão
              </Link>
            </li>
            <li className='w-full'>
              <Link
                className='hover:text-white hover:bg-blue-900 h-20 flex items-center justify-center'
                to='/relatorios'
              >
                Relatórios
              </Link>
            </li>
            <li className='w-full'>
              <Link
                className='hover:text-white hover:bg-blue-900 h-20 flex items-center justify-center'
                to='/sessions'
              >
                Consultas
              </Link>
            </li>
            <li className='w-full'>
              <Link
                className='hover:bg-red-600 h-20 flex items-center justify-center'
                to='/'
                onClick={handleLogout}
              >
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
