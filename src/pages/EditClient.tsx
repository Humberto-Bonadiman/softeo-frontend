import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './../components/Header';
import { Alert, Form, Button } from 'react-bootstrap';
import { fetchApiUpdateClientById } from '../services/fetchApi';
import { DentistContext } from '../context/DentistContext';

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { oneClient, setOneClient } = useContext(DentistContext);
  const replaceDate = oneClient.date.replace("/", "-").replace(" ", "T");
  const [error, setError] = useState(false);
  const [name, setName] = useState(oneClient.name);
  const [treatment, setTreatment] = useState(oneClient.treatment);
  const [date, setDate] = useState(replaceDate);
  const [valueTreatment, setValueTreatment] = useState(oneClient.value);
  const [numberPlots, setNumberPlots] = useState(oneClient.numberPlots);

  function formatDate (input: string) {
    const theDate = input;
    const day = theDate.substring(8, 10);
    const month = theDate.substring(5, 7);
    const year = theDate.substring(0, 4);
    return `${day}/${month}/${year}`;
  }

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const token = localStorage.getItem('token') || '';
    const value = parseInt(valueTreatment);
    const formatedDate = formatDate(date);
    if (typeof id === 'string') {
      const result = await fetchApiUpdateClientById(
        id,
        token.substring(1, token.length-1),
        { name, treatment, date: formatedDate, value, numberPlots },
      );
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

  useEffect(() => {
    setName(oneClient.name);
    setTreatment(oneClient.treatment);
    setDate(oneClient.date);
    setValueTreatment(oneClient.value);
    setNumberPlots(oneClient.numberPlots);
  }, [id, setOneClient, oneClient]);
  
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
            type="date"
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
          Atualizar dados
        </Button>
      </Form>
      { error && ALERT }
    </div>
  );
};

export default EditClient;