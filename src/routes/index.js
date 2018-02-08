import express from 'express';
import Ajv from 'ajv';

import schemas from './schema.json';
import sensor from './sensor';
// import all other routes here

const Router = express.Router();
const ajv = new Ajv();

Router.use((req, res, next) => {
  const schema = schemas[req.originalUrl][req.method];
  const validate = ajv.compile(schema);
  const isValid = req.body && validate(req.body);
  console.log(validate.errors);

  if (isValid === true) return next();

  return next({ message: validate.errors[0].message, statusCode: 400 });
});

Router.use('/sensor', sensor);

export default Router;
