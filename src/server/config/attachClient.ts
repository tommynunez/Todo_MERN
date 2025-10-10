import path from 'path';
import fs from 'fs';
import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import ViteExpress from 'vite-express';

export type AttachClientOptions = {
  clientRoot?: string; // development root (source)
  clientDist?: string; // production build folder
};

/**
 * Attach Vite dev server in development, or serve built static files in production.
 * @param app 
 * @param server 
 * @param opts
 * @example
 * ```ts
 * import express from 'express';
 * import { createServer } from 'http';
 * import attachClient from './config/attachClient';
 * const app = express();
 * const server = createServer(app);
 * attachClient(app, server, { clientRoot: '../client' });
 * server.listen(3000);
 * ```
 */
export default function attachClient(app: Express, server: Server, opts: AttachClientOptions = {}) {
  const clientRoot = opts.clientRoot ?? path.resolve(process.cwd(), 'client');
  const clientDist = opts.clientDist ?? path.resolve(clientRoot, 'dist');

  if (process.env.NODE_ENV === 'production') {
    if (!fs.existsSync(clientDist)) {
      console.warn(`Client dist not found at ${clientDist} — ensure frontend is built`);
    }
    app.use(express.static(clientDist));
    app.get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api')) return res.sendStatus(404);
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  } else {
    // development: let Vite (in-process) serve public/ and handle ?import requests.
    if (!fs.existsSync(clientRoot)) {
      console.error(`[attachClient] clientRoot not found at ${clientRoot} — Vite will fail to start`);
    }

    try {
      ViteExpress.config({
        viteConfigFile: path.resolve(clientRoot, 'vite.config.ts'),
      });
      ViteExpress.bind(app, server);
      console.log('[attachClient] Vite dev server bound to Express — do NOT run frontend dev server separately.');
    } catch (err) {
      console.error('[attachClient] Failed to bind Vite dev server:', err);
    }
  }
}