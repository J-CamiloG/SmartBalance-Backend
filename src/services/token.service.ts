import jwt from 'jsonwebtoken';
import { IUserDocument } from '../types/user.model';

export class TokenService {
    static create(user: IUserDocument): string {
        return jwt.sign(
            { 
                userId: user._id,
                role: user.role 
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );
    }

    static verify(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    }
}