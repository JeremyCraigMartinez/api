import express from 'express';

const Router = express.Router();

Router.get('/', (req, res) => {
  res.send('hello world');
});

Router.post('/', (req, res) => {
  res.send('hello world');
});

export default Router;
