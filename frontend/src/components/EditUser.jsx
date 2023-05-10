import React, { useContext } from 'react';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import styles from './Edituser.module.css';

function EditUser() {
  const { customers } = useContext(Context);
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.nome}</td>
              <td>
                <button
                  type='button'
                  onClick={() => navigate(`/customer/${customer.id}`)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EditUser;
