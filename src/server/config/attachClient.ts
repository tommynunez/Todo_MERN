import path from 'path';
import fs from 'fs';
import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import ViteExpress from 'vite-express';

export type AttachClientOptions = {
  clientRoot?: string; // development root (source)
  clientDist?: string; // production build folder
};

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
    // development: bind vite dev server into express
    if (!fs.existsSync(clientRoot)) {
      console.warn(`Client root not found at ${clientRoot} — Vite may fail to start`);
    }
    ViteExpress.config({ inlineViteConfig: { root: clientRoot } });
    ViteExpress.bind(app, server);
    console.log('Vite dev server bound to Express — do NOT run the frontend dev server separately.');
  }
}