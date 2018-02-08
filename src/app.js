import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.statusCode).send(error.message);
});

export default app;
