import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Figure, Form, Button, Alert } from 'react-bootstrap';
import Logo from '../images/Logo.jpg';
import { fetchApi } from '../services/fetchApi';
import { DentistContext } from '../context/DentistContext';

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setDentist } = useContext(DentistContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const isEmailValid = (userEmail: string) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(userEmail);
  };

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchApi(email, password);
    const ERROR = 401;
    if (result.status === ERROR) {
      setError(true);
    }
    const POST = 200;
    if (result.status === POST) {
      const body = await result.json();
      setToken(body);
      setDentist({ email });
      localStorage.setItem('token', JSON.stringify(body));
      localStorage.setItem('email', JSON.stringify(email));
      navigate('/clients');
    }
  };

  const dentistIsOn = () => {
    const value = localStorage.getItem('token');
    if (typeof value === 'string') {
      const parse = JSON.parse(value);
      if (parse) {
        setToken(parse);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(dentistIsOn, []);

  const MIN_LENGTH = 5;
  const ALERT = (
    <Alert
      key="danger"
      variant="danger"
      className="container-sm error text-center mt-3 w-50"
      data-testid="common_login__element-invalid-email"
      style={ { maxWidth: '400px', minWidth: '300px' } }
      onClose={ () => setError(false) }
      dismissible
    >
      E-mail ou senha incorretos.
    </Alert>
  );

  return (
    <Container style={ { marginTop: '20px' } }>
      <Figure className="container-sm text-center">
        <Figure.Image
          width={ 230 }
          alt="Logo"
          src={ Logo }
          className="rounded-3"
        />
      </Figure>
      <Form
        className="card mt-3 pb-3 pt-1 container-sm w-50"
        style={ { maxWidth: '400px', minWidth: '300px' } }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="joao@email.com.br"
            data-testid="common_login__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="**********"
            data-testid="common_login__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          data-testid="common_login__button-login"
          disabled={ !(isEmailValid(email) && password.length >= MIN_LENGTH) }
          className="mt-3"
          onClick={ handleClick }
        >
          Entrar
        </Button>
        <Button
          variant="outline-primary"
          type="submit"
          data-testid="common_login__button-register"
          className="mt-3"
          onClick={ () => { navigate('/register'); } }
        >
          Ainda n??o possuo uma conta
        </Button>
      </Form>
      { error && ALERT }
    </Container>
  );
};

export default Login;