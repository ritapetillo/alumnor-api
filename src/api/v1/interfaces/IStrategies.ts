import { ITokens } from "./Itoekens";

export interface IGoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface IGoogleUserPayload extends Express.User {
  
    user: {} | undefined;
    tokens: ITokens | undefined;
  

}
