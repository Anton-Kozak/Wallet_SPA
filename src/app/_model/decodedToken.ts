export interface DecodedToken {
  aud: string;
  exp: number;
  hasWallet: string;
  iat: number;
  iss: string;
  nameid: string;
  nbf: number;
  role: string[];
  unique_name: string;
}
