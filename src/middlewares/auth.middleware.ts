import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/user.model';

// **
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: UserRole;
    };
}


export const auth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'Authentication required' });
            return;
        }

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
            role: UserRole;
        };

      
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ 
            message: 'Invalid token',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};


export const isAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Authentication required' });
            return;
        }

        if (req.user.role !== UserRole.ADMIN) {
            res.status(403).json({ message: 'Admin privileges required' });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({ 
            message: 'Error checking admin privileges',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};