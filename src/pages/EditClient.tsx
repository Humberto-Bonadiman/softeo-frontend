import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './../components/Header';
import { fetchApiRegister } from '../services/fetchApi';
import { DentistContext } from '../context/DentistContext';

const editClient = () => {
  const { id } = useParams<{id?: string}>();
  return (<h1>Edit Client</h1>)
};

export default editClient;