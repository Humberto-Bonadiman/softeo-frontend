import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchApiFindClientById } from '../services/fetchApi';
import { DentistContext } from '../context/DentistContext';

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { oneClient } = useContext(DentistContext);
  const [error, setError] = useState(false);
  const [name, setName] = useState(oneClient.name);
  const [treatment, setTreatment] = useState(oneClient.treatment);
  const [date, setDate] = useState(oneClient.date);
  const [valueTreatment, setValueTreatment] = useState(oneClient.value);
  const [numberPlots, setNumberPlots] = useState(oneClient.numberPlots);

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const value = localStorage.getItem('token') || '';
    console.log(value);
    if (typeof id === 'string') {
      const result = await fetchApiFindClientById(id, value.substring(1, value.length-1));
      const ERROR = 401;
      if (result.status === ERROR) {
        setError(true);
      }
      const STATUS_CODE_OK = 200;
      if (result.status === STATUS_CODE_OK) {
        setError(false);
        navigate('/clients');
      }
    }
  };
  
  return (
    <div>
      <Header />

      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTreatment">
          <Form.Label>Tratamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tratamento"
            value={ treatment }
            onChange={ ({ target }) => setTreatment(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="datetime-local"
            value={ date }
            onChange={ ({ target }) => setDate(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicValue">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={ valueTreatment }
            step=".01"
            onChange={ ({ target }) => setValueTreatment(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumberPlots">
          <Form.Label>Número de parcelas</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={ numberPlots }
            onChange={ ({ target }) => setNumberPlots(parseInt(target.value)) }
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={ handleClick }>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditClient;