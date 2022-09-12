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
  clients: IClients[];
  setClients: React.Dispatch<React.SetStateAction<IClients[]>>;
};

const initialValue = {
  dentist: {
      email: '',
  },
  setDentist: () => {},
  token: '',
  setToken: () => {},
  clients: [{
    id: '',
    name: '',
    treatment: '',
    date: '',
    value: '',
    numberPlots: 0,
    valuePlots: '',
    dentistId: '',
  }],
  setClients: () => [{}],
};

export const DentistContext = createContext<DentistContextType>(initialValue);

export const DentistContextProvider = ({ children }: DentistContextProps) => {
  const [dentist, setDentist] = useState(initialValue.dentist);
  const [token, setToken] = useState(initialValue.token);
  const [clients, setClients] = useState(initialValue.clients);
  return <DentistContext.Provider value={{
    dentist,
    setDentist,
    token,
    setToken,
    clients,
    setClients,
  }}>{children}</DentistContext.Provider>;
};