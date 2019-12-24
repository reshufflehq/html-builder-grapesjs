import express from 'express';
import { get, update } from '@reshuffle/db';
import { defaultHandler } from '@reshuffle/server-function';
import { authHandler } from '@reshuffle/passport';

const app = express();
const devDBAdmin = require('@reshuffle/db-admin');
app.use('/dev/db-admin', express.json(), devDBAdmin.devDBAdminHandler);

/**GrapesJS Storage Manager Endpoints  */
const editorPrefix = 'editor';

app.all('/store', express.json(), async function(req, res) {
  const editorData = req.body;
  await update(editorPrefix, editor => {
    return editorData;
  });
  res.sendStatus(200);
});

app.all('/load', async function(req, res) {
  const result = await get(editorPrefix);
  res.json(result);
});

app.use(authHandler);
app.use(defaultHandler);

export default app;
