export type SigninResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  userProfile: any;
  status?: string;
};
