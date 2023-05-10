import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Context from './context/Context';
import { useContext } from 'react';
import AddSession from './pages/AddSession';
import Customer from './pages/Customer';
import Sessions from './pages/Sessions';
import 'react-toastify/dist/ReactToastify.css';
import EditCustomer from './pages/EditCustomer';
import EditSession from './pages/EditSession';

function App() {
  const { user } = useContext(Context);

  const checkRole = () => {
    if (user.role === 'customer') return '/sessions';
    // if (user.role === 'seller') return '/seller/orders';
    // if (user.role === 'administrator') return '/admin/manage';
  };

  return (
    <Routes>
      {user === null ? (
        <>
          <Route exact path='/' element={<Navigate to='/login' />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </>
      ) : (
        <>
          <Route exact path='/' element={<Navigate to={checkRole()} />} />
          <Route exact path='/login' element={<Navigate to={checkRole()} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/addsession' element={<AddSession />} />
          <Route path='/sessions' element={<Sessions />} />
          <Route path='/customer/:id' element={<EditCustomer />} />
          <Route path='/sessions/:id' element={<EditSession />} />
        </>
      )}
    </Routes>
  );
}

export default App;
