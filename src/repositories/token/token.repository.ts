import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { IToken, Token } from '../../entity';
import { ITokenRepository } from './token.repository.interface';
import { ITokenDataToSave } from '../../interfaces';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<Token | undefined> {
        // @ts-ignore
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async findByParams(filterObject: Partial<IToken>): Promise<Token | undefined> {
        // @ts-ignore
        return getManager().getRepository(Token).findOne(filterObject);
    }

    public async deleteByParams(findObject: Partial<IToken>): Promise<DeleteResult> {
        return getManager().getRepository(Token).delete(findObject);
    }
}

// @ts-ignore
export const tokenRepository = new TokenRepository();
