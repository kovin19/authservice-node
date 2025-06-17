import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use(authRoutes);
app.use(usersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
    console.log('Swagger en http://localhost:3000/api-docs');
})