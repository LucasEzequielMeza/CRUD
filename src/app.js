import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import router from './routes/auth.routes.js';
import taskRouter from './routes/tasks.routes.js';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use("/api/",router);
app.use("/api/",taskRouter);

export default app;