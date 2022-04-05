import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async getUsers(req:Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.getUsers();
        return res.json(users);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req:Request, res:Response): Promise<Response<IUser>> {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async updateUser(req: Request, res: Response): Promise<Response<UpdateResult>> {
        const {
            email,
            password,
        } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, password, email);
        return res.json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);
        return res.json(deletedUser);
    }
}

export const userController = new UserController();
