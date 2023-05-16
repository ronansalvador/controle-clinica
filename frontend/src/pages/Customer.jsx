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
    // window.location.reload();
    getCustomers();
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* <button
          className={styles.button}
          type='button'
          onClick={createCustomer}
        >
          Adicionar usuario
        </button>
        <button className={styles.button} type='button' onClick={editCustomer}>
          Editar
        </button> */}
        <Button onClick={editCustomer} type={`button`}>
          {`Editar`}
        </Button>
        <Button onClick={createCustomer} type={`button`}>
          {`Adicionar usuario`}
        </Button>
      </div>
      {create && <CreateCustomer />}
      {edit && <EditUser />}
    </>
  );
}

export default Customer;
