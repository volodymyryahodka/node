import { userService } from './user.service';
import { IUser } from '../entity';
import { tokenService } from './token.service';
import { ITokenData } from '../interfaces';

class AuthService {
    public async registration(body: IUser): Promise<ITokenData> {
        const { email } = body;

        const user = await userService.getUserByEmail(email);
        if (user) {
            throw new Error(`User with this email: ${email} already exist`);
        }
        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenData> {
        const { id, email } = userData;
        const { refreshToken, accessToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, refreshToken, accessToken);

        return {
            accessToken,
            refreshToken,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
