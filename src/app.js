// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { NODE_ENV } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
