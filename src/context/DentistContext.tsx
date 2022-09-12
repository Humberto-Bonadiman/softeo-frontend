import React, { useState, createContext, ReactNode } from 'react';

type DentistContextProps = {
  children: ReactNode;
};

interface IDentist {
  id: string;
  name: string;
  email: string;
  password: string;
}

type DentistContextType = {
  dentists: IDentist[];
  setDentists: React.Dispatch<React.SetStateAction<IDentist[]>>;
};

const initialValue = {
  dentists: [
    {
      id: '',
      email: '',
      name: '',
      password: ''
    }
  ],
  setDentists: () => [{}]
};

export const DentistContext = createContext<DentistContextType>(initialValue);

export const DentistContextProvider = ({ children }: DentistContextProps) => {
  const [dentists, setDentists] = useState(initialValue.dentists);
  return <DentistContext.Provider value={{ dentists, setDentists }}>{children}</DentistContext.Provider>;
};