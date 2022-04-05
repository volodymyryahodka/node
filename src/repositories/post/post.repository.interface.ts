import { UpdateResult } from 'typeorm';

import { IPost } from '../../entity/post.entity';

export interface IPostRepository {
    createPost(post: IPost): Promise<IPost>;
    getUserPosts(id: number): Promise<IPost[]>;
    updatePost(id: number, title: string, text: string): Promise<UpdateResult>;
}
