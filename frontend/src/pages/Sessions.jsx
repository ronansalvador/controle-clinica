import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import moment from 'moment';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import './Sessions.css';

function Sessions() {
  const { sessions, getSessions } = useContext(Context);
  const navigate = useNavigate();

  const formatarData = (data) => {
    return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <>
      <Header />
      <div className='wrapper'>
        <h1>Consultas</h1>
        <div className='table-container'>
          <table className='tabela'>
            <caption>Consultas</caption>
            <thead>
              <tr>
                <th>Data</th>
                <th>Paciente</th>
                <th>Tipo</th>
                <th>Local</th>
                <th>Valor</th>
                <th>Sessão</th>
                <th>Pagamento</th>
                <th>Pgto</th>
                <th>Data pgto</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((sessao, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Sessions;
