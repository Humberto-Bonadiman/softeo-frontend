import React, { useState, createContext, ReactNode } from 'react';
import { IClients } from '../interfaces/clientInterface';
import { IDentist } from '../interfaces/dentistInterface';

type DentistContextProps = {
  children: ReactNode;
};

type DentistContextType = {
  dentist: IDentist;
  setDentist: React.Dispatch<React.SetStateAction<IDentist>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  oneClient: IClients;
  setOneClient: React.Dispatch<React.SetStateAction<IClients>>;
  allClients: IClients[];
  setAllClients: React.Dispatch<React.SetStateAction<IClients[]>>;
};

const initialValue = {
  dentist: {
      email: '',
  },
  setDentist: () => {},
  token: '',
  setToken: () => {},
  oneClient: {
    id: '',
    name: '',
    treatment: '',
    date: '',
    value: '',
    numberPlots: 0,
    valuePlots: '',
    dentistId: '',
  },
  setOneClient: () => {},
  allClients: [{
    id: '',
    name: '',
    treatment: '',
    date: '',
    value: '',
    numberPlots: 0,
    valuePlots: '',
    dentistId: '',
  }],
  setAllClients: () => [{}],
};

export const DentistContext = createContext<DentistContextType>(initialValue);

export const DentistContextProvider = ({ children }: DentistContextProps) => {
  const [dentist, setDentist] = useState(initialValue.dentist);
  const [token, setToken] = useState(initialValue.token);
  const [allClients, setAllClients] = useState(initialValue.allClients);
  const [oneClient, setOneClient] = useState(initialValue.oneClient);
  return <DentistContext.Provider value={{
    dentist,
    setDentist,
    token,
    setToken,
    oneClient,
    setOneClient,
    allClients,
    setAllClients,
  }}>{children}</DentistContext.Provider>;
};