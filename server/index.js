import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
