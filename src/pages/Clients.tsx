import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApiShowClientByDentistId } from '../services/fetchApi';
import { DentistContext } from '../context/DentistContext';
import Header from '../components/Header';
import { VscEdit, VscTrash } from 'react-icons/vsc';

const Clients = () => {
  const navigate = useNavigate();
  const { setClients, clients } = useContext(DentistContext);

  const getClientsByDentist = async () => {
    const value = localStorage.getItem('token');
    if (typeof value === 'string') {
      const parse = JSON.parse(value);
      if (parse) {
        const response = await fetchApiShowClientByDentistId(parse);
        const data = await response.json();
        console.log(data);
        setClients(data);
      }
    }
  };

/*   const deleteClient = (id: string) => {
    removeExpenses(id);
  } */

  const editClient = (id: string) => {
    return (
      <button
        data-testid="edit-btn"
        onClick={ () => navigate(`/clients/edit/${id}`) }
        type="button"
        className="btn-edit-table btn"
      >
        <VscEdit className="btn-image" color="white" />
      </button>
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
          {clients.map(({ id, name, treatment, date, value, numberPlots, valuePlots }, index) => (
            <tr key={index}>
              <th>{id}</th>
              <td>{name}</td>
              <td>{treatment}</td>
              <td>{date}</td>
              <td>{value}</td>
              <td>{numberPlots}</td>
              <td>{valuePlots}</td>
              <td>{editClient(id)} / <VscTrash className="btn-image" color="white" /></td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;