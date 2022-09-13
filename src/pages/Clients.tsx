import { useContext, useEffect, useState } from 'react';
import { fetchApiShowClientByDentistId } from '../services/fetchApi';
import { DentistContext } from '../context/DentistContext';
import Header from '../components/Header';
import { Form, Button } from 'react-bootstrap';
import '../styles/clients.css';
import BelowHeader from '../components/BelowHeader';
import TableClients from '../components/TableClients';

const Clients = () => {
  const { setAllClients, allClients } = useContext(DentistContext);
  const token = localStorage.getItem('token') || '';
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [show, setShow] = useState(false);

  const getClientsByDentist = async () => {
    const parse = JSON.parse(token);
    if (parse) {
      const response = await fetchApiShowClientByDentistId(parse);
      const data = await response.json();
      setAllClients(data);
    };
  };

  const totalValue = allClients.map((item) => parseInt(item.value))
    .reduce((prev, curr) => prev + curr, 0);

  const valueByMonth = allClients.map((item) => parseInt(item.valuePlots))
    .reduce((prev, curr) => prev + curr, 0);

  function converteData(DataDDMMYY: string) {
    const dataSubstring = DataDDMMYY.substring(0, 10);
    const dataSplit = dataSubstring.split("/");
    const novaData = new Date(parseInt(dataSplit[2], 10),
      parseInt(dataSplit[1], 10) - 1,
      parseInt(dataSplit[0], 10));
    return novaData;
  };

  function formatDate (input: string) {
    const theDate = input;
    const day = theDate.substring(8, 10);
    const month = theDate.substring(5, 7);
    const year = theDate.substring(0, 4);
    return `${day}/${month}/${year}`;
  };

  const filterClients = () => {
    const filteredClients = allClients.filter(result => {
      const init = converteData(formatDate(initialDate));
      const final = converteData(formatDate(finalDate));
      const resultado = converteData(result.date) >= init && converteData(result.date) <= final;
      return resultado;
    });
    return filteredClients;
  }

  const getMonthsPeriod = () => {
    const first = parseInt(initialDate.substring(5, 7));
    const second = parseInt(finalDate.substring(5, 7));
    let period;
    if (first > second) {
      period = (first + second) - first;
      return valueByMonth * period;
    }
    period = second - first;
    return valueByMonth * period;
  }

  const BUTTON = (
    <Button
      onClick={ () => {
        getClientsByDentist();
        setShow(false);
      } }
      variant="primary"
      type="button"
      className="button-filter"
    >
      Mostrar todos os clientes
    </Button>
  );

  const VALUE_MONTH = (
    <p>Valor a receber por mês: {valueByMonth}</p>
  );

  const VALUE_PERIOD = (
    <p>Valor a receber no período: {getMonthsPeriod()}</p>
  )

  useEffect(() => {
    getClientsByDentist();
    filterClients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div>
      <Header />
      <BelowHeader />
      <div>
        <Form className="filter-date">
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Data inicial</Form.Label>
            <Form.Control
              type="date"
              value={ initialDate }
              onChange={ ({ target }) => setInitialDate(target.value) }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Data final</Form.Label>
            <Form.Control
              type="date"
              value={ finalDate }
              onChange={ ({ target }) => setFinalDate(target.value) }
            />
          </Form.Group>
          <Button
            onClick={ () => {
              setAllClients(filterClients());
              setShow(true);
            } }
            variant="primary"
            type="button"
            className="button-filter"
          >
            Filtar por data
          </Button>
          { show && BUTTON }
        </Form>
      </div>
      <TableClients />
      <p>Valor total: {totalValue}</p>
      { show && VALUE_MONTH }
      { show && VALUE_PERIOD }
    </div>
  );
};

export default Clients;