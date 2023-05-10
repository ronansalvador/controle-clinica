import React, { useMemo, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Context from './Context';
import axios from 'axios';

function Provider({ children }) {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUser);
  const [local, setLocal] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [typePayment, setTypePayment] = useState([]);

  const URL_API = 'http://localhost:3001/';

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getLocal = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`${URL_API}localService`, headers);
      setLocal(response.data);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  const getServiceType = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`${URL_API}serviceType`, headers);
      setServiceType(response.data);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  const getCustomers = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`${URL_API}customer`, headers);
      setCustomers(response.data);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  const getTypePayment = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`${URL_API}paymentMethod`, headers);
      setTypePayment(response.data);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  const getSessions = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`${URL_API}session`, headers);
      setSessions(response.data);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  useEffect(() => {
    getLocal();
    getServiceType();
    getCustomers();
    getSessions();
    getTypePayment();
  }, []);

  const value = useMemo(
    () => ({
      user,
      local,
      serviceType,
      setUser,
      customers,
      sessions,
      setSessions,
      getCustomers,
      getSessions,
      typePayment,
      handleLogout,
    }),
    [
      user,
      local,
      serviceType,
      setUser,
      customers,
      sessions,
      setSessions,
      typePayment,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
