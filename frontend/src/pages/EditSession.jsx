import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Select from 'react-select';
import Context from '../context/Context';
import axios from 'axios';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import './EditSession.css';

function EditSession() {
  const { customers, local, serviceType, typePayment, user, handleLogout } =
    useContext(Context);
  const { id } = useParams();
  const [dateSession, setDateSession] = useState('');
  const [sessao, setSessao] = useState('');
  const [customer, setCustomer] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [typeService, setTypeService] = useState('');
  const [localSession, setLocalSession] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [valor, setValor] = useState('');
  const [paymentMade, setPaymentMade] = useState(false);
  const [pacote, setPacote] = useState('');
  const [numberSession, setNumberSession] = useState('');
  // const [localDefault, setLocalDefault] = useState('');

  const URL_API = 'http://localhost:3001/';

  const getSessionById = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`${URL_API}session/${id}`, headers);

      const session = response.data[0];
      // const nome = session.cliente.nome;
      setSessao(session);

      // const cliente = {
      //   value: nome,
      //   label: nome,
      // };
      setCustomer(session.id_cliente);
      // getCustomerID(cliente);
      setDateSession(session.data);
      setPaymentDate(session.data_pagamento);
      setLocalSession(session.id_local_atendimento);
      setTypeService(session.id_tipo_atendimento);
      setPaymentType(session.id_forma_de_pagamento);
      setPaymentMade(session.confirmacao_pagamento);
      setPacote(session.sessao_pacote);
      setNumberSession(session.numero_sessao);
      setValor(session.valor);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  // const getCustomerID = async (option) => {
  //   const value = option.value;
  //   const customer = customers.filter((item) =>
  //     item.nome.toLowerCase().includes(value.toLowerCase()),
  //   )[0]?.id;
  //   setCustomerId(customer);
  // };

  const getlocalID = async (option) => {
    const value = option.value;

    const localID = local.filter((item) =>
      item.local.toLowerCase().includes(value.toLowerCase()),
    )[0].id;
    setLocalSession(localID);
  };

  const getserviceTypelID = async (option) => {
    const value = option.value;

    const serviceTypeId = serviceType.filter((item) =>
      item.nome.toLowerCase().includes(value.toLowerCase()),
    )[0].id;
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

  useEffect(() => {
    getSessionById();
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

  const editSession = async () => {
    const data = {
      data: dateSession,
      id_cliente: customerId || customer,
      id_tipo_atendimento: typeService,
      id_local_atendimento: localSession,
      valor: parseFloat(valor),
      numero_sessao: Number(numberSession),
      id_forma_de_pagamento: paymentType,
      confirmacao_pagamento: paymentMade,
      data_pagamento: paymentDate,
      pacote_ativo: true,
      sessao_pacote: Number(pacote),
    };
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.put(
        `http://localhost:3001/session/${id}`,
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
      <Header />
      <div className='container'>
        <div className='data-sessao'>
          <label htmlFor='data-sessao'>Data da sessão</label>
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
          <p>{sessao?.cliente?.nome}</p>

          {/* <Select
          options={optionsCustomers}
          // value={customer}
          // value={customer}
          onChange={getCustomerID}
          // className='teste-select'
          isClearable={true}
          // placeholder='Cliente'
        /> */}
          <Select
            options={optionsLocal}
            onChange={getlocalID}
            isClearable={true}
            placeholder={sessao?.local_atendimento?.local}
          />
          <Select
            id='teste-Ronan'
            options={optionsServicetype}
            // value={selectedOption}
            onChange={getserviceTypelID}
            // className='teste-select'
            isClearable={true}
            placeholder={sessao?.tipo_atendimento?.nome}
          />
          <Input
            type='number'
            required='required'
            placeholder='pacote'
            // className='input-phone'
            // id='input-phone'
            value={pacote}
            onChange={({ target }) => setPacote(target.value)}
            name='data-sessao'
          />
          <Input
            type='number'
            required='required'
            placeholder='numero da Sessão'
            // className='input-phone'
            // id='input-phone'
            value={numberSession}
            onChange={({ target }) => setNumberSession(target.value)}
            name='data-sessao'
          />
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
            placeholder={sessao?.forma_pagamento?.nome}
          />
        </div>
        <div className='data-sessao'>
          <label htmlFor='data-pagamento'>Data do Pagamento</label>
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
          onClick={editSession}
          className={`create-customer-btn`}
          type={`button`}
        >
          {`Editar`}
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

export default EditSession;
