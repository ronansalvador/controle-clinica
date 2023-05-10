import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import axios from 'axios';
// import Context from '../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import './CreateCustomer.css';

function CreateCustomer() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

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

  const handlePhoneChange = (event) => {
    // Remove tudo que não é número do valor inserido pelo usuário
    const cleanedValue = event.target.value.replace(/\D/g, '');

    // Formata o valor inserido pelo usuário
    const formattedValue = cleanedValue.replace(
      /^(\d{2})(\d{5})(\d{4})/,
      '($1)$2-$3',
    );

    // Atualiza o estado do telefone
    setPhone(formattedValue);
  };

  const createClient = async () => {
    const data = { nome: name, cpf, telefone: phone, endereco: address };
    try {
      const response = await axios.post('http://localhost:3001/customer', data);

      if (response.data) {
        showToastSuccess('Cliente inserido com sucesso!');
        setName('');
        setCpf('');
        setPhone('');
        setAddress('');
      }
      // if ('message' in response) return setLoginWarning(response.data);
      // saveLocalStorage('user', response.data);
      // setUser(JSON.parse(localStorage.getItem('user')));
      // Após cadastro o usuário faz login automático e é redirecionado
      // navigate('/painel');
    } catch (error) {
      // setLoginWarning(error.response.data);
      showToastError(error.response.data);
    }
  };

  return (
    <>
      <div className='create-customer'>
        <Input
          type='text'
          required='required'
          placeholder='Nome'
          className='input-name'
          id='input-name'
          value={name}
          onChange={({ target }) => setName(target.value)}
          name='name'
        />
        <Input
          type='text'
          // required='required'
          placeholder='CPF: apenas numero'
          className='input-phone'
          id='input-phone'
          value={cpf}
          onChange={({ target }) => setCpf(target.value)}
          name='email'
        />
        <Input
          type='tel'
          required='required'
          placeholder='Telefone: somente numero'
          className='input-phone'
          id='input-phone'
          value={phone}
          onChange={handlePhoneChange}
          name='email'
        />
        <Input
          type='text'
          required='required'
          placeholder='Endereço'
          className='input-address'
          id='input-address'
          value={address}
          onChange={({ target }) => setAddress(target.value)}
          name='address'
        />
        <Button
          onClick={createClient}
          className={`create-customer-btn`}
          type={`button`}
        >
          {`Adicionar`}
        </Button>
        {/* {message ? <p>Cliente inserido com sucesso</p> : ''} */}
        {/* <button onClick={showToastMessage}>Notificar</button> */}
        <ToastContainer />
      </div>
    </>
  );
}

export default CreateCustomer;
