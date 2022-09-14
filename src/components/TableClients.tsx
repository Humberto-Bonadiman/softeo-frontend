import { useContext } from 'react';
import { DentistContext } from '../context/DentistContext';
import { confirmAlert } from 'react-confirm-alert'; 
import {
  fetchApiFindClientById,
  fetchApiDeleteClientById,
  fetchApiShowClientByDentistId
} from '../services/fetchApi';
import { Link } from 'react-router-dom';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import '../styles/tableClients.css';

const TableClients = () => {
  const { allClients, setOneClient, setAllClients } = useContext(DentistContext);
  const token = localStorage.getItem('token') || '';

  const getClientsByDentist = async () => {
    const parse = JSON.parse(token);
    if (parse) {
      const response = await fetchApiShowClientByDentistId(parse);
      const data = await response.json();
      setAllClients(data);
    };
  };

  const editUser = async (id: string) => {
    const result = await fetchApiFindClientById(id, token.substring(1, token.length-1));
    const data = await result.json();
    setOneClient(data);
  };

  const linkClient = (id: string) => {
    return (
      <Link to={ `/clients/edit/${id}` } onClick={ () => editUser(id)}>
        <VscEdit className="btn-image" color="white" />
      </Link>
    );
  };

  const submit = (id: string, token: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h3>Confirme para enviar a requisição</h3>
            <p>Você tem certeza que deseja deletar os dados do cliente?</p>
            <button
              className="btn btn-primary"
              onClick={ async () => {
                await fetchApiDeleteClientById(
                  id,
                  token.substring(1, token.length - 1)
                );
                getClientsByDentist();
                onClose();
              }}
            >
              Sim
            </button>
            <button className="btn btn-primary" onClick={ onClose }>Não</button>
          </div>
        );
      }
    });
  };

  const deleteButton = (id: string, token: string) => {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a>
        <VscTrash className="btn-image" color="white" onClick={ () => submit(id, token) } />
      </a>
    );
  };

  return(
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
                {linkClient(id)} / {deleteButton(id, token)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default TableClients;