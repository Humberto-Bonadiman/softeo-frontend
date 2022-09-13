export interface IClients {
  id: string;
  name: string;
  treatment: string;
  date: string;
  value: string;
  numberPlots: number;
  valuePlots: string;
  dentistId: string;
};

export interface clientInterface {
  name: string,
  treatment: string,
  value: number,
  numberPlots: number
}

export interface clientWithDateInterface extends clientInterface {
  date: string
}