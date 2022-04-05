import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../../entity/user.entity';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: number, password: string, email: string): Promise<UpdateResult>;
    deleteUser(id: number): Promise<DeleteResult>;
}
