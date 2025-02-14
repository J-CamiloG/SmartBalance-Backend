import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import swaggerUi from'swagger-ui-express';
import authRoutes from './routes/auth.routes';
import { specs } from './config/swagger';


dotenv.config();

const app = express();

app.use(express.json()); // ******

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/auth', authRoutes);

// Conectar a MongoDB
connectDB();


const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`);
    });