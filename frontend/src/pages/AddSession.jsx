import React from 'react';
import CreateSession from '../components/CreateSession';
import Header from '../components/Header';

function AddSession() {
  // const {
  //   data,
  //   valor,
  //   numero_sessao,
  //   confirmacao_pagamento,
  //   data_pagamento,
  //   id_cliente,
  //   id_tipo_atendimento,
  //   pacote_ativo,
  //   sessao_pacote,
  //   id_local_atendimento,
  //   id_forma_de_pagamento
  // } = req.body;
  return (
    <>
      <Header />
      <CreateSession />
    </>
  );
}

export default AddSession;
