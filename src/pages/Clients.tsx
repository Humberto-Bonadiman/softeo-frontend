import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApiShowClientByDentistId, fetchApiFindClientById } from '../services/fetchApi';
import { DentistContext } from '../context/DentistContext';
import Header from '../components/Header';
import { VscEdit, VscTrash } from 'react-icons/vsc';

const Clients = () => {
  const { setAllClients, allClients, setOneClient } = useContext(DentistContext);

  const getClientsByDentist = async () => {
    const value = localStorage.getItem('token');
    if (typeof value === 'string') {
      const parse = JSON.parse(value);
      console.log(parse);
      if (parse) {
        const response = await fetchApiShowClientByDentistId(parse);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setAllClients(data);
      }
    }
  };

  const editUser = async (id: string) => {
    const value = localStorage.getItem('token') || '';
    const result = await fetchApiFindClientById(id, value.substring(1, value.length-1));
    const data = await result.json();
    console.log(data);
    setOneClient(data);
  };

/*   const deleteClient = (id: string) => {
    removeExpenses(id);
  } */

  const linkClient = (id: string) => {
    return (
      <Link to={ `/clients/edit/${id}` } onClick={ () => editUser(id)}>
        <VscEdit className="btn-image" color="white" />
      </Link>
    );
  }

  useEffect(() => {
    getClientsByDentist();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div>
      <Header />
      <h1>Clients</h1>
      <div className="table-responsive">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th scope="col" data-testid="table-header-id">Id</th>
              <th scope="col" data-testid="table-header-name">Nome</th>
              <th scope="col" data-testid="table-header-email">Tratamento</th>
              <th scope="col" data-testid="table-header-date">Data</th>
              <th scope="col" data-testid="table-header-date">Valor</th>
              <th scope="col" data-testid="table-header-date">Número de parcelas</th>
              <th scope="col" data-testid="table-header-date">Valor das parcelas</th>
              <th scope="col" data-testid="table-header-edit">Editar/Deletar</th>
            </tr>
          </thead>
          <tbody>
          {allClients.map(({ id, name, treatment, date, value, numberPlots, valuePlots }, index) => (
            <tr key={index}>
              <th>{id}</th>
              <td>{name}</td>
              <td>{treatment}</td>
              <td>{date}</td>
              <td>{value}</td>
              <td>{numberPlots}</td>
              <td>{valuePlots}</td>
              <td>
                {linkClient(id)} / <VscTrash className="btn-image" color="white" />
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;