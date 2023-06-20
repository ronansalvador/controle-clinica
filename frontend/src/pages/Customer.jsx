import React, { useContext, useState } from 'react';
import CreateCustomer from '../components/CreateCustomer';
import Header from '../components/Header';
import EditUser from '../components/EditUser';
import styles from './Customer.module.css';
import Button from '../components/Button';
import Context from '../context/Context';

function Customer() {
  const { getCustomers } = useContext(Context);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(true);

  const createCustomer = () => {
    setCreate(true);
    setEdit(false);
  };

  const editCustomer = () => {
    setCreate(false);
    setEdit(true);
    getCustomers();
  };
  return (
    <main className='flex flex-col min-h-screen bg-stone-200 '>
      <Header />
      <div className='flex h-20 items-center justify-evenly bg-stone-200 '>
        <Button onClick={editCustomer} type={`button`}>
          {`Editar`}
        </Button>
        <Button onClick={createCustomer} type={`button`}>
          {`Adicionar usuario`}
        </Button>
      </div>
      {create && <CreateCustomer />}
      {edit && <EditUser />}
    </main>
  );
}

export default Customer;
