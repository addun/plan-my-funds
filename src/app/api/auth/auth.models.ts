export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface UserDataResponse {
  userId: string;
  token: string;
}
