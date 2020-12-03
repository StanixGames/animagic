import express from "express";

import { DB } from '../db';

const delay = (time: number) => new Promise((res) => setTimeout(res, time));

export const APIHandler = (app: express.Application) => {
  app.use(express.json());
  app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.post('/login', async (req: any, res: any) => {
    await delay(1000);
  
    const { login, password } = req.body;
    const session = DB.login(login, password);
  
    if (!session) {
      res.status(400).send({
        result: 'error',
        data: {
          message: 'Invalid credentials',
        }
      });
    } else {
      res.status(200).send({
        result: 'ok',
        data: {
          session,
        },
      });
    }
  });

  app.delete('/logout', async (req: any, res: any) => {
    await delay(1000);
  
    const { session } = req.body;
    DB.logout(session);
  
    res.status(200).send({
      result: 'ok',
      data: {
        message: 'Logout'
      }
    })
  });

  app.get('/user', async (req: any, res: any) => {
    await delay(1000);
  
    const { session } = req.body;
  
    if (DB.checkSession(session)) {
      res.status(200).send({
        result: 'ok',
        data: {
          firstName: 'Test',
          lastName: 'Test',
        }
      });
    } else {
      res.status(401).send({
        result: 'error',
        data: {
          message: 'Invalid session',
        }
      });
    }
  });
};
