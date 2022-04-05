import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { commentService } from '../services';
import { IComment } from '../entity';

class CommentController {
    public async createComment(req: Request, res: Response): Promise<Response<IComment>> {
        const createdComment = await commentService.createComment(req.body);
        return res.json(createdComment);
    }

    public async getUserComments(req: Request, res: Response): Promise<Response<IComment[]>> {
        const { id } = req.params;
        const userComments = await commentService.getUserComments(id);
        return res.json(userComments);
    }

    public async setLikeDislike(req: Request): Promise<UpdateResult | undefined> {
        const { action, commentId } = req.body;
        return commentService.setLikeDislike(action, commentId);
    }
}

export const commentController = new CommentController();
