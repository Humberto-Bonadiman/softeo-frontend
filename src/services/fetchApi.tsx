import { clientInterface, clientWithDateInterface } from "../interfaces/clientInterface";

const appJson = 'application/json';
const softeo = 'https://softeo-backend-humberto.herokuapp.com';
const localhost = 'http://localhost:3001';
const request = localhost || softeo;

export const fetchApi = async (email: string, password: string) => {
  const fecthLogin = fetch(`${request}/login`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const response = await fecthLogin;
  return response;
};

export const fetchApiRegister = async (email: string, name: string, password: string) => {
  const fetchRegister = fetch(`${request}/dentist`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  });
  const response = await fetchRegister;
  return response;
};

export const fetchApiShowClientByDentistId = async (token: string) => {
  const fetchShowClientByDentistId = fetch(`${request}/client/dentist`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
      Authorization: token,
    },
  });
  const response = await fetchShowClientByDentistId;
  return response;
};

export const fetchApiFindClientById = async (id: string, token: string) => {
  const fetchFindClientById = fetch(`${request}/client/${id}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
      Authorization: token,
    },
  });
  const response = await fetchFindClientById;
  return response;
};

export const fetchApiUpdateClientById = async (
  id: string,
  token: string,
  elementsClient: clientWithDateInterface
) => {
  const fetchUpdateClientById = fetch(`${request}/client/${id}`, {
    method: 'PUT',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
      Authorization: token,
    },
    body: JSON.stringify(elementsClient),
  });
  const response = await fetchUpdateClientById;
  return response;
};

export const fetchApiCreateClient = async (
  token: string,
  elementsClient: clientInterface
) => {
  const fetchUpdateClientById = fetch(`${request}/client`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
      Authorization: token,
    },
    body: JSON.stringify(elementsClient),
  });
  const response = await fetchUpdateClientById;
  return response;
};

export const fetchApiDeleteClientById = async (id: string, token: string) => {
  const fetchDeleteClientById = fetch(`${request}/client/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
      Authorization: token,
    },
  });
  const response = await fetchDeleteClientById;
  return response;
};
