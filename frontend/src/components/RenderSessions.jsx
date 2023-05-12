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
    <tr key={index}>
      <td>{formatarData(sessao.data)}</td>
      <td>{sessao.cliente.nome}</td>
      <td>{sessao.tipo_atendimento.nome}</td>
      <td>{sessao.local_atendimento.local}</td>
      <td>{parseFloat(sessao.valor).toFixed(2)}</td>
      <td>{sessao.numero_sessao}</td>
      <td>{sessao.forma_pagamento.nome}</td>
      <td>{sessao.confirmacao_pagamento ? 'ok' : ''}</td>
      <td>{formatarData(sessao.data_pagamento)}</td>
      <td>
        <button
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
