import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import './Sessions.css';
import RenderSessions from '../components/RenderSessions';
import Select from 'react-select';
import { set } from 'mongoose';

function Sessions() {
  const { sessions, customers } = useContext(Context);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  // console.log('sessao', sessions);

  // console.log(sessions);

  // useEffect(() => {
  //   getSessions().then(() => {
  //     setFilteredSessions(sessions);
  //   });
  // }, []);
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  useEffect(() => {
    setFilteredSessions(sessions);
  }, [sessions]);

  // console.log(filteredSessions);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filterData = (teste) => {
    console.log('teste', teste);
    if (teste) {
      const filtered = teste.filter((item) => {
        const itemDate = new Date(item.data);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) {
          return itemDate >= start && itemDate <= end;
        } else if (start) {
          return itemDate >= start;
        } else if (end) {
          return itemDate <= end;
        } else {
          return true;
        }
      });
      console.log(filtered);
      setFilteredSessions(filtered);
    } else if (!teste) {
      const filtered = sessions.filter((item) => {
        const itemDate = new Date(item.data);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) {
          return itemDate >= start && itemDate <= end;
        } else if (start) {
          return itemDate >= start;
        } else if (end) {
          return itemDate <= end;
        } else {
          return true;
        }
      });
      console.log(filtered);
      filtrarPorCliente(filtered);
    }

    // if (filteredSessions.length > 0) teste = filteredSessions;
    // if (filteredSessions.length === 0) teste = sessions;
  };

  const optionsCustomers = customers.map((customer) => ({
    value: customer.nome,
    label: customer.nome,
  }));

  const filtrarPorCliente = async (dataFirst) => {
    await setFilteredSessions(sessions);
    // console.log(filteredSessions);
    console.log('select option', selectedOption);

    if (dataFirst && !selectedOption) {
      console.log('dataFirst', dataFirst);
      setFilteredSessions(dataFirst);
    }

    if (dataFirst && selectedOption) {
      console.log('dataFirst e Selected option');
      const newFilter = dataFirst.filter(
        (session) => session.cliente.nome === selectedOption?.value,
      );
      setFilteredSessions(newFilter);
    }

    // if (!dataFirst && selectedOption === null) {
    //   console.log('select null', filteredSessions);
    // } else {
    //   const newFilter = sessions.filter(
    //     (session) => session.cliente.nome === selectedOption.value,
    //   );
    //   await filterData(newFilter);
    // }

    if (!dataFirst) {
      console.log('não data first');
      const newFilter = sessions.filter(
        (session) => session.cliente.nome === selectedOption.value,
      );
      await filterData(newFilter);
    }
    // console.log(filteredSessions);
    // if (selectedOption !== null && filteredSessions.length > 0) {
    //   const newFilter = filteredSessions.filter(
    //     (session) => session.cliente.nome === selectedOption.value,
    //   );
    //   console.log(newFilter);
    //   setFilteredSessions(newFilter);
    // } else if (selectedOption !== null && filteredSessions.length === 0) {
    //   const newFilter = filteredSessions.filter(
    //     (session) => session.cliente.nome === selectedOption.value,
    //   );
    //   console.log(newFilter);
    //   setFilteredSessions(newFilter);
    // } else if (selectedOption === null) {
    //   setFilteredSessions(sessions);
    // }
  };

  useEffect(() => {
    // console.log('filteredSessions', filteredSessions);
    // console.log('selectedOption', selectedOption);
    filtrarPorCliente();
  }, [selectedOption]);

  useEffect(() => {
    filterData();
  }, [startDate, endDate]);

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setSelectedOption(null);
    setFilteredSessions(sessions);
  };

  return (
    <>
      <Header />
      <div className='wrapper'>
        <h1>Consultas</h1>
        <div>
          <label htmlFor='start-date'>Start Date:</label>
          <input
            type='date'
            id='start-date'
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label htmlFor='end-date'>End Date:</label>
          <input
            type='date'
            id='end-date'
            value={endDate}
            onChange={handleEndDateChange}
          />
          <button onClick={() => clearFilter()}>Limpar Filtros</button>
          <Select
            options={optionsCustomers}
            value={selectedOption}
            onChange={setSelectedOption}
            // className='teste-select'
            isClearable={true}
            placeholder='Cliente'
          />
        </div>
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
              {filteredSessions.length > 0 ? (
                <RenderSessions sessions={filteredSessions} />
              ) : (
                <p>Sem consultas para esses filtros</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Sessions;
