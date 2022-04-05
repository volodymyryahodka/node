import {
    Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

import { CommonFields } from './commonFields.entity';
import { User } from './user.entity';
import { IComment, Comment } from './comment.entity';
import { config } from '../config';

export interface IPost {
    userId: number;
    title: string;
    text: string;
    comments: IComment[];
}

@Entity('Posts', { database: config.MYSQL_DATABASE_NAME })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'int',
        nullable: false,
    })
        userId!: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;
}
