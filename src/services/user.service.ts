import { IUserDocument, UserResponse } from '../types/user.model';
import User from '../models/user.model';


export class UserService {
    static formatResponse(user: IUserDocument): UserResponse {
        const userObject = user.toObject();
        return {
            id: userObject._id.toString(),
            email: userObject.email,
            name: userObject.name,
            role: userObject.role
        };
    }

    static async findByEmail(email: string) {
        return User.findOne({ email });
    }

    static async validatePassword(user: IUserDocument, password: string) {
        return user.comparePassword(password);
    }
}