import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db/models/index.js';
import eventsRoutes from './routes/eventsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


await db.sequelize.sync({ alter: true, logging: false });

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/api/events', eventsRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});