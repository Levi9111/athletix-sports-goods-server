import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './middlewares/notFound';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const serverStarterPage = async (req: Request, res: Response) => {
  res.send('Athletix Sports Goods server');
};

app.get('/', serverStarterPage);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
