import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import Header from '../components/Header';
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
    <main className='flex flex-col min-h-screen bg-stone-200 '>
      <Header />
      <div className='flex flex-col items-center justify-around gap-2 p-10'>
        <h2>Filtrar</h2>
        <div className='flex flex-col w-5/6 lg:w-1/2 justify-evenly'>
          <label htmlFor='start-date'>Data Inicial:</label>
          <Input
            type='date'
            id='start-date'
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label className='mt-5' htmlFor='end-date'>
            Data Final:
          </label>
          <Input
            type='date'
            id='end-date'
            value={endDate}
            onChange={handleEndDateChange}
          />

          <Select
            className='mt-5'
            options={optionsCustomers}
            id='select-customer'
            value={selectedOption}
            onChange={setSelectedOption}
            isClearable={true}
            placeholder='Cliente'
          />
          <button
            className='bg-blue-600 p-1 rounded m-5 self-center text-white'
            onClick={() => clearFilter()}
          >
            Limpar Filtros
          </button>
        </div>
        <div className='flex justify-center items-center'>
          <table className='w-4/5 lg:w-5/6 divide-y divide-gray-200 grow'>
            {/* <caption>Consultas</caption> */}
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Data
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Paciente
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell lg:table-cell'>
                  Tipo
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
                  Local
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
                  Valor
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
                  Sessão
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
                  Pagamento
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
                  Pgto
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
                  Data pgto
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Editar
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredSessions.length > 0 ? (
                <RenderSessions sessions={filteredSessions} />
              ) : (
                <p>Sem consultas para esses filtros</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Sessions;
