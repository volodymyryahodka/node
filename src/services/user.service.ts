import { DeleteResult, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositories';
import { config } from '../config';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async updateUser(id: string, password: string, email: string):
        Promise<UpdateResult> {
        return userRepository.updateUser(+id, password, email);
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return userRepository.deleteUser(+id);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('wrong email or password');
        }
    }

    private _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
