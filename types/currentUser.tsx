export interface CurrentUserTypes {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData?: ProviderDataEntity[] | null;
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}
export interface ProviderDataEntity {
  providerId: string;
  uid: string;
  displayName?: null;
  email: string;
  phoneNumber?: null;
  photoURL?: null;
}
export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}
