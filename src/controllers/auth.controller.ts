import { Request, Response } from 'express';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { UserRole } from '../types/user.model';
import User from '../models/user.model';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await UserService.findByEmail(email);
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Verificar password
        const isValidPassword = await UserService.validatePassword(user, password);
        if (!isValidPassword) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Generar token y formatear respuesta
        const token = TokenService.create(user);
        const userResponse = UserService.formatResponse(user);

        res.status(200).json({
            message: 'Login successful',
            user: userResponse,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error during login',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};


export const register = async (req: Request, res: Response): Promise<void> => {
    try{

        const {email, password, name } = req.body;
        if(!email || !password || !name){
            res.status(400).json({
                message: 'All fields are required'
            });
            return;
        }

        const existingUser = await UserService.findByEmail(email);
        if(existingUser){
            res.status(400).json({
                message: 'Email already registered'
            });
            return;
        }

        const user = new User({
            email,
            password,
            name,
            role: UserRole.CLIENT 
        });

        await user.save();

        // Generar token y respuesta
        const token = TokenService.create(user);
        const userResponse = UserService.formatResponse(user);

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse,
            token
        });
    }
    catch (error) {
        console.error('Error completo:', error); 
        res.status(500).json({
            message: 'Error registering user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};


export const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await UserService.findByEmail(email);
        if (existingUser) {
            res.status(400).json({ 
                message: 'Email already registered' 
            });
            return;
        }

        const user = new User({
            email,
            password,
            name,
            role: UserRole.ADMIN 
        });

        await user.save();

        res.status(201).json({
            message: 'Admin user created successfully',
            user: UserService.formatResponse(user)
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating admin user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};