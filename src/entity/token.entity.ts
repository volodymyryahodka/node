import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { User } from './user.entity';
import { CommonFields, ICommonFields } from './commonFields.entity';
import { config } from '../config';

export interface IToken extends ICommonFields{
    userId: number;
    refreshToken: string;
    accessToken: string;
}

@Entity('Tokens', { database: config.MYSQL_DATABASE_NAME })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
