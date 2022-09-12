const appJson = 'application/json';
const softeo = 'https://softeo-backend-humberto.herokuapp.com';
const localhost = 'http://localhost:3001';
const request = softeo || localhost;

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
