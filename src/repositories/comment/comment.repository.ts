import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { Comment, IComment } from '../../entity';
import { ICommentRepository } from './comment.repository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async createComments(comment: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async getUserComments(id: number): Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    public async getQueryRunner(): Promise<Repository<Comment>> {
        return getManager().getRepository(Comment);
    }

    public async getComment(queryRunner: any, id: number): Promise<IComment> {
        return queryRunner.createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .getOne();
    }

    public async setLike(queryRunner: Repository<Comment>, comment: IComment, id: number):
        Promise<UpdateResult> {
        return queryRunner.update({ id }, { like: comment.like + 1 });
    }

    public async setDislike(queryRunner: Repository<Comment>, comment: IComment, id: number)
        : Promise<UpdateResult> {
        return queryRunner.update({ id }, { dislike: comment.dislike + 1 });
    }
}

// @ts-ignore
export const commentRepository = new CommentRepository ();
