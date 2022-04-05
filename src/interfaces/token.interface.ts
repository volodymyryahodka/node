export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenDataToSave extends ITokenPair {
    userId: number;
}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}

export type ITokenData = ITokenPair & IUserPayload;
