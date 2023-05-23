import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

import Header from '../components/Header';
import './Sessions.css';
import RenderSessions from '../components/RenderSessions';
import Select from 'react-select';
import Input from '../components/Input';

function Sessions() {
  const { sessions, customers, getSessions } = useContext(Context);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  useEffect(() => {
    setFilteredSessions(sessions);
  }, [sessions]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filterData = (customerFirst) => {
    if (customerFirst) {
      const filtered = customerFirst.filter((item) => {
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
      setFilteredSessions(filtered);
    } else if (!customerFirst) {
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
      filtrarPorCliente(filtered);
    }
  };

  const optionsCustomers = customers.map((customer) => ({
    value: customer.nome,
    label: customer.nome,
  }));

  const filtrarPorCliente = async (dataFirst) => {
    await setFilteredSessions(sessions);

    if (dataFirst && !selectedOption) {
      setFilteredSessions(dataFirst);
    }

    if (dataFirst && selectedOption) {
      const newFilter = dataFirst.filter(
        (session) => session.cliente.nome === selectedOption?.value,
      );
      setFilteredSessions(newFilter);
    }
    if (!dataFirst) {
      const newFilter = sessions.filter(
        (session) => session.cliente.nome === selectedOption.value,
      );
      await filterData(newFilter);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  useEffect(() => {
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
      <div className='session-page'>
        <h2>Filtrar</h2>
        <div className='filter-sessions'>
          <label htmlFor='start-date'>Data Inicial:</label>
          <Input
            type='date'
            id='start-date'
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label htmlFor='end-date'>Data Final:</label>
          <Input
            type='date'
            id='end-date'
            value={endDate}
            onChange={handleEndDateChange}
          />
          <label htmlFor='select-customer'>Cliente:</label>
          <div className='session-select'>
            <Select
              options={optionsCustomers}
              id='select-customer'
              value={selectedOption}
              onChange={setSelectedOption}
              isClearable={true}
              placeholder='Cliente'
            />
          </div>
          <button onClick={() => clearFilter()}>Limpar Filtros</button>
        </div>
        <div className='table-container'>
          <table className='tabela'>
            {/* <caption>Consultas</caption> */}
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
