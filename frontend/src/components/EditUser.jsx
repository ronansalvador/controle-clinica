import React, { useContext } from 'react';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';

function EditUser() {
  const { customers } = useContext(Context);
  const navigate = useNavigate();

  return (
    <section className='flex justify-center items-center'>
      <table className='w-4/5 lg:w-5/6 divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Nome
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Editar
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {customers.map((customer) => (
            <tr key={customer.id} className='hover:bg-blue-50'>
              <td className='px-6 py-4 whitespace-nowrap'>{customer.nome}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button
                  className='bg-blue-700 p-1 text-white rounded text-sm hover:scale-110'
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
