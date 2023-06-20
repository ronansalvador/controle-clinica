import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import '../components/CreateCustomer.css';
import Context from '../context/Context';

function EditCustomer() {
  const { user, handleLogout } = useContext(Context);
  const { id } = useParams();
  const [customer, setCustomer] = useState('');
  const URL_API = 'http://localhost:3001/';
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const getCustomer = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`${URL_API}customer/${id}`, headers);

      const customerData = response.data[0];
      setCustomer(customerData);
      setName(customerData.nome);
      setCpf(customerData.cpf);
      setPhone(customerData.telefone);
      setAddress(customerData.endereco);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

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

  const editClient = async () => {
    const data = { nome: name, cpf, telefone: phone, endereco: address };
    const headers = { headers: { authorization: user.token } };
    try {
      const response = await axios.put(
        `http://localhost:3001/customer/${id}`,
        data,
        headers,
      );

      if (response.data) {
        showToastSuccess('Dados alterados com sucesso!');
      }
    } catch (error) {
      showToastError(error.response.data);
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  return (
    <main className='flex flex-col min-h-screen bg-stone-200 '>
      <Header />

      <div className='w-5/6 mx-auto p-3 flex flex-col justify-center items-center gap-5'>
        <h1>Editar dados do cliente</h1>
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
          onClick={editClient}
          className={`create-customer-btn`}
          type={`button`}
        >
          {`Editar`}
        </Button>
        <ToastContainer />
      </div>
    </main>
  );
}

export default EditCustomer;
