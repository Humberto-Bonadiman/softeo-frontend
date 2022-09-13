import { useNavigate } from 'react-router-dom';

const BelowHeader = () => {
  const navigate = useNavigate();

  const navigateToCreateUser = () => {
    navigate('/clients/create');
  };

  return(
    <div className="below-header">
      <h3 className="h3">Listagem de clientes</h3>
      <button
        type="button"
        className="btn btn-primary"
        data-testid="redirect-button"
        onClick={ navigateToCreateUser }
      >
        Adicionar novo cliente
      </button>
    </div>
  );
};

export default BelowHeader;