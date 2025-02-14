import { Document } from "mongoose";

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export enum UserRole {
    CLIENT = 'client',
    ADMIN = 'admin'
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: UserRole;
} 

export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}