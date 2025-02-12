import { Document } from "mongoose";

export enum UserRole {
    ADMIN = "admin",
    client = "client"
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