export interface dentistInterface {
  email: string,
  name: string,
  password: string,
}

export interface dentistCreatedInterface extends dentistInterface {
  id: string,
}