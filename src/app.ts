import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

// app.use('/', router);

const serverStarterPage = async (req: Request, res: Response) => {
  res.send('Athletix Sports Goods server');
};

app.get('/', serverStarterPage);

export default app;
