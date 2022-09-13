import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './../components/Header';
import Button from 'react-bootstrap/Button';
import { Alert, Form } from 'react-bootstrap';
import { fetchApiCreateClient } from '../services/fetchApi';

const CreateClient = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [treatment, setTreatment] = useState('');
  const [valueTreatment, setValueTreatment] = useState('0');
  const [numberPlots, setNumberPlots] = useState(0);

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const token = localStorage.getItem('token') || '';
    const value = parseInt(valueTreatment);
    const result = await fetchApiCreateClient(
      token.substring(1, token.length-1),
      { name, treatment, value, numberPlots },
    );
    const ERROR = 401;
    if (result.status === ERROR) {
      setError(true);
    }
    const STATUS_CODE_CREATE = 201;
    if (result.status === STATUS_CODE_CREATE) {
      setError(false);
      navigate('/clients');
    }
  };

  const ALERT = (
    <Alert
      key="danger"
      variant="danger"
      className="container-sm error text-center mt-3 w-50"
      data-testid="common_edit_client__element-invalid-update"
      style={ { maxWidth: '400px', minWidth: '300px' } }
      onClose={ () => setError(false) }
      dismissible
    >
      Algum dado não foi informado ou não está correto.
    </Alert>
  );
  
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
          Criar cliente
        </Button>
      </Form>
      { error && ALERT }
    </div>
  );
};

export default CreateClient;