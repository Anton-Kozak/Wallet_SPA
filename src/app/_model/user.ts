export interface User {
  id: string;
  address: string;
  age: number;
  email: string;
  username: string;
  walletID?: number;
  photoUrl?: string;
  dateJoined: Date;
}
