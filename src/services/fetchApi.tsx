const appJson = 'application/json';

export const fetchApi = async (email: string, password: string) => {
  const fecthLogin = fetch('https://softeo-backend-humberto.herokuapp.com/login', {
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
  const fetchRegister = fetch('https://softeo-backend-humberto.herokuapp.com/dentist', {
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
