import express from 'express';
import * as db from '@reshuffle/db';
import moment from 'moment';
import { defaultHandler } from '@reshuffle/server-function';
import { authHandler } from '@reshuffle/passport';

const app = express();
const devDBAdmin = require('@reshuffle/db-admin');
app.use('/dev/db-admin', express.json(), devDBAdmin.devDBAdminHandler);

app.use(authHandler);
app.use(defaultHandler);

app.post('/register', express.json(), async function(req, res) {
  let key = `user/${req.body.email}`;
  let time = moment().format(`MMMM Do YYYY, h:mm:ss a`);
  let value = { email: req.body.email, time: time };
  await db.create(key, value);
  res.sendStatus(200);
});

export default app;
