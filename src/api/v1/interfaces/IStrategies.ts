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

export interface IFacebookPayload {
  id: string;
  displayName: string;
  name: Name;
  emails: Email[];
  photos: Photo[];
  provider: string;
  _raw: string;
  _json: Json;
}

export interface Name {
  familyName: string;
  givenName: string;
}

export interface Email {
  value: string;
}

export interface Photo {
  value: string;
}

export interface Json {
  id: string;
  name: string;
  email: string;
  picture: Picture;
  last_name: string;
  first_name: string;
}

export interface Picture {
  data: any[];
}
