export type AnyOfInlineResponse200ResponseData = LoginCount & LoginExpiry & LoginUsers;

export interface ResponseBase {
  status: string;
  message?: string;
}

export interface InlineResponse200 extends ResponseBase {
  responseData?: AnyOfInlineResponse200ResponseData;
}

export interface LoginCount {
  totalLoggedIn?: number;
  totalRequired?: number;
}

export interface LoginExpiry {
  passwordExpired?: boolean;
}

export interface LoginRequestAuthCredentials {
  username?: string;
  password?: string;
}

export interface LoginRequest {
  authType?: string;
  authCredentials?: LoginRequestAuthCredentials;
}

export interface LoginUsers {
  loggedInUsers?: Array<string>;
}
