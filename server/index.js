import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db/models/index.js';
import eventsRoutes from './routes/eventsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import participationsRoutes from './routes/participationsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger.config.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await db.sequelize.sync({ logging: false });

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/api/events', eventsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/participations', participationsRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV !== 'production') {
    const specs = swaggerJsdoc(swaggerOptions);
    app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
