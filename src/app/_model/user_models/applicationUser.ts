export interface ApplicationUser {
  address: string;
  age: number;
  email: string;
  firstName: string;
  normalizedUserName?: string;
  lastName: string;
  city: string;
  country: string;
  isWalletAdmin: boolean;
  walletID: number;
  userPhotoId: number;
  dateJoined: Date;
}
