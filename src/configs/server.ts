import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import MainRouter from '../routes';
import { fileLocation } from '../constants';

export default class ServerConfigure {
  private app: express.Application | undefined;
  private API_PORT: number | undefined;
  constructor() {
    this.serverInitialize();
    this.apiListen();
    this.setRoutes();
    this.createDBFile();
  }

  private serverInitialize() {
    dotenv.config({});
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.API_PORT = Number(process.env.API_PORT);
  }

  private apiListen() {
    this.app
      ?.listen(this.API_PORT, () => {
        console.log(`API is listening ${this.API_PORT}`);
      })
      .on('error', (err) => {
        console.log(
          '🚀 ~ file: server.ts ~ line 33 ~ ServerConfigure ~ .on ~ err',
          err.message,
        );
      });
  }

  private setRoutes() {
    this.app?.use('/api', MainRouter);
  }

  private async createDBFile() {
    if (!fs.existsSync(fileLocation)) {
      fs.writeFileSync(fileLocation, '[]');
    }
  }
  public getApp() {
    return this.app;
  }
}
