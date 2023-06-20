import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function RenderSessions(props) {
  const navigate = useNavigate();
  const { sessions } = props;

  const formatarData = (data) => {
    return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
  };
  return sessions.map((sessao, index) => (
    <tr key={index} className='hover:bg-blue-50'>
      <td className='px-6 py-4 whitespace-nowrap'>
        {formatarData(sessao.data)}
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{sessao.cliente.nome}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap hidden md:table-cell lg:table-cell'>
        {sessao.tipo_atendimento.nome}
      </td>
      <td className='px-6 py-4 whitespace-nowrap hidden lg:table-cell'>
        {sessao.local_atendimento.local}
      </td>
      <td className='px-6 py-4 whitespace-nowrap hidden lg:table-cell'>
        {parseFloat(sessao.valor).toFixed(2)}
      </td>
      <td className='px-6 py-4 whitespace-nowrap hidden lg:table-cell'>
        {sessao.numero_sessao}
      </td>
      <td className='px-6 py-4 whitespace-nowrap hidden lg:table-cell'>
        {sessao.forma_pagamento.nome}
      </td>
      <td className='px-6 py-4 whitespace-nowrap hidden lg:table-cell'>
        {sessao.confirmacao_pagamento ? 'ok' : ''}
      </td>
      <td className='px-6 py-4 whitespace-nowrap hidden lg:table-cell'>
        {formatarData(sessao.data_pagamento)}
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <button
          className='bg-blue-700 p-1 text-white rounded text-sm hover:scale-110'
          type='button'
          onClick={() => navigate(`/sessions/${sessao.id}`)}
        >
          Editar
        </button>
      </td>
    </tr>
  ));
}

export default RenderSessions;
