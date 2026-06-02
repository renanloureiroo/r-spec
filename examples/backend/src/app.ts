import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

const HTTP_INTERNAL_SERVER_ERROR = 500;

export function createApp(): Express {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req: Request, res: Response) => {
    console.log('[health]: health check requested');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[error]:', err.stack);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong!',
      message: err.message,
    });
  });

  return app;
}
