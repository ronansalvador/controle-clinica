import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import Input from './Input';
import Button from './Button';
import Select from 'react-select';
import './CreateSession.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function CreateSession() {
  const {
    customers,
    getCustomers,
    local,
    serviceType,
    typePayment,
    user,
    handleLogout,
  } = useContext(Context);
  const [dateSession, setDateSession] = useState('');
  const [customer, setCustomer] = useState(null);
  const [typeService, setTypeService] = useState('');
  const [localSession, setLocalSession] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [valor, setValor] = useState('');
  const [paymentMade, setPaymentMade] = useState(false);
  const [pacote, setPacote] = useState('');
  const [numberSession, setNumberSession] = useState('');
  const [lastSession, setLastSession] = useState('');
  const [isPack, setIsPack] = useState(false);

  const URL_API = 'http://localhost:3001/';

  const getLastSession = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(
        `${URL_API}session/lastsession/${customer}`,
        headers,
      );

      const last = response.data;
      console.log('last', last);
      setLastSession(last);
      setIsPack(last.pacote_ativo);
      setPacote(last.sessao_pacote);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  useEffect(() => {
    if (customer > 0) {
      console.log('maior que 0', customer);
      getLastSession();
    }
    console.log(lastSession);
  }, [customer]);

  const getCustomerID = (option) => {
    const value = option.value;

    const customerId = customers.filter((item) =>
      item.nome.toLowerCase().includes(value.toLowerCase()),
    )[0].id;
    setCustomer(customerId);
  };

  const getlocalID = async (option) => {
    const value = option.value;

    const localID = local.filter((item) =>
      item.local.toLowerCase().includes(value.toLowerCase()),
    )[0].id;
    setLocalSession(localID);
  };

  const getserviceTypelID = async (option) => {
    const value = option.value;
    console.log('servicetype', value);

    const serviceTypeId = serviceType.filter((item) =>
      item.nome.toLowerCase().includes(value.toLowerCase()),
    )[0].id;

    // if (serviceTypeId === 3) {
    //   // buscar ultima seção do Clientee verirficar o pacote
    //   setPacote(10);
    // }
    if (serviceTypeId === 1 || serviceTypeId === 2) {
      setPacote(0);
    }
    setTypeService(serviceTypeId);
  };

  const getPaymentTypelID = async (option) => {
    const value = option.value;

    const serviceTypeId = typePayment.filter((item) =>
      item.nome.toLowerCase().includes(value.toLowerCase()),
    )[0].id;
    setPaymentType(serviceTypeId);
  };

  const validatePayment = (date) => {
    setPaymentDate(date);
    const made = paymentMade;

    setPaymentMade(!made);
  };

  // const activePackage = () => {
  //   console.log('lastSession', lastSession);
  //   const active = lastSession.pacote_ativo;
  //   console.log(active);
  // };

  useEffect(() => {
    getCustomers();
  }, []);

  const optionsCustomers = customers.map((customer) => ({
    value: customer.nome,
    label: customer.nome,
  }));

  const optionsLocal = local.map((local) => ({
    value: local.local,
    label: local.local,
  }));

  const optionsServicetype = serviceType.map((tipo) => ({
    value: tipo.nome,
    label: tipo.nome,
  }));

  const optionsTypePayment = typePayment.map((type) => ({
    value: type.nome,
    label: type.nome,
  }));

  const showToastSuccess = (mensagem) => {
    toast.success(mensagem, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastError = (mensagem) => {
    toast.error(mensagem, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const insertSession = async () => {
    const isPackage = () => {
      if (pacote === 0) return false;
      if (Number(pacote) > Number(numberSession)) return true;
      else return false;
    };
    const data = {
      data: dateSession,
      id_cliente: customer,
      id_tipo_atendimento: typeService,
      id_local_atendimento: localSession,
      valor: parseFloat(valor),
      numero_sessao: Number(numberSession),
      id_forma_de_pagamento: paymentType,
      confirmacao_pagamento: paymentMade,
      data_pagamento: paymentDate,
      pacote_ativo: isPackage(),
      sessao_pacote: Number(pacote),
    };
    try {
      console.log(data);
      const headers = { headers: { authorization: user.token } };
      const response = await axios.post(
        'http://localhost:3001/session',
        data,
        headers,
      );

      if (response.data) {
        showToastSuccess('Sessao inserida com sucesso!');
        // setName('');
        // setCpf('');
        // setPhone('');
        // setAddress('');
      }
      // if ('message' in response) return setLoginWarning(response.data);
      // saveLocalStorage('user', response.data);
      // setUser(JSON.parse(localStorage.getItem('user')));
      // Após cadastro o usuário faz login automático e é redirecionado
      // navigate('/painel');
    } catch (error) {
      // setLoginWarning(error.response.data);
      showToastError(error.response.data);
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  return (
    <>
      <div className='container'>
        <div className='data-sessao'>
          <label htmlFor='data-sessao'>Data da sessão:</label>
          <Input
            type='date'
            required='required'
            // placeholder='Telefone: somente numero'
            // className='input-phone'
            // id='input-phone'
            value={dateSession}
            onChange={({ target }) => setDateSession(target.value)}
            name='data-sessao'
          />
        </div>
        <div className='sessao-select'>
          <Select
            options={optionsCustomers}
            // value={selectedOption}
            onChange={getCustomerID}
            // className='teste-select'
            isClearable={true}
            placeholder='Cliente'
          />
          <Select
            options={optionsLocal}
            // value={selectedOption}
            onChange={getlocalID}
            // className='teste-select'
            isClearable={true}
            placeholder='Local'
          />

          {isPack ? (
            <>
              <p>Ultima sessão</p>
              <p>{`sessao ${lastSession.numero_sessao} / ${lastSession.sessao_pacote}`}</p>
              <Input
                type='number'
                required='required'
                placeholder='Pacote'
                // className='input-phone'
                // id='input-phone'
                value={pacote}
                onChange={({ target }) => setPacote(target.value)}
                name='data-sessao'
              />
              <Input
                type='number'
                required='required'
                placeholder='Numero da Sessão'
                // className='input-phone'
                // id='input-phone'
                value={numberSession}
                onChange={({ target }) => setNumberSession(target.value)}
                name='data-sessao'
              />
            </>
          ) : (
            <>
              <Select
                options={optionsServicetype}
                // value={selectedOption}
                onChange={getserviceTypelID}
                // className='teste-select'
                isClearable={true}
                placeholder='Tipo de Atendimento'
              />
              {/* <Input
                type='number'
                required='required'
                placeholder='Pacote'
                // className='input-phone'
                // id='input-phone'
                value={pacote}
                onChange={({ target }) => setPacote(target.value)}
                name='data-sessao'
              />
              <Input
                type='number'
                required='required'
                placeholder='Numero da Sessão'
                // className='input-phone'
                // id='input-phone'
                value={numberSession}
                onChange={({ target }) => setNumberSession(target.value)}
                name='data-sessao'
              /> */}
            </>
          )}
          {typeService === 3 && (
            <>
              <Input
                type='number'
                required='required'
                placeholder='Pacote'
                // className='input-phone'
                // id='input-phone'
                value={pacote}
                onChange={({ target }) => setPacote(target.value)}
                name='data-sessao'
              />
              <Input
                type='number'
                required='required'
                placeholder='Numero da Sessão'
                // className='input-phone'
                // id='input-phone'
                value={numberSession}
                onChange={({ target }) => setNumberSession(target.value)}
                name='data-sessao'
              />
            </>
          )}

          <Input
            type='number'
            required='required'
            placeholder='Valor da Sessão'
            // className='input-phone'
            // id='input-phone'
            value={valor}
            onChange={({ target }) => setValor(target.value)}
            name='data-sessao'
          />
          <Select
            options={optionsTypePayment}
            // value={selectedOption}
            onChange={getPaymentTypelID}
            // className='teste-select'
            isClearable={true}
            placeholder='Tipo de Pagamento'
          />
        </div>
        <div className='data-sessao'>
          <label htmlFor='data-pagamento'>Data do Pagamento:</label>
          <Input
            type='date'
            // required='required'
            // placeholder='Telefone: somente numero'
            // className='input-phone'
            // id='input-phone'
            value={paymentDate}
            onChange={({ target }) => validatePayment(target.value)}
            name='data-pagamento'
          />
        </div>
        <br></br>
        <Button
          onClick={insertSession}
          className={`create-customer-btn`}
          type={`button`}
        >
          {`Adicionar`}
        </Button>
        <ToastContainer />
      </div>
      {/* pacote_ativo, sessao_pacote
      INSERT INTO sessao (
        data,
        id_cliente,
        id_tipo_atendimento,
        id_local_atendimento,
        valor,
        numero_sessao,
        id_forma_de_pagamento,
        confirmacao_pagamento,
        data_pagamento,
        pacote_ativo,
        sessao_pacote
        
        data: dateSession,
      id_cliente: customer,
      id_tipo_atendimento: typeService,
      id_local_atendimento: localSession,
      valor: valor,
      numero_sessao: numberSession,
      id_forma_de_pagamento: paymentType,
      confirmacao_pagamento: paymentMade,
      data_pagamento: paymentDate,
      pacote_ativo: true,
        
        ) VALUES
      ('2023-04-26', 1, 2, 3, 100.00, 1, 4, true, '2023-04-26', true, 5); */}
    </>
  );
}

export default CreateSession;
