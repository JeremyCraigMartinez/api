import express from 'express';
import { Validator } from 'jsonschema';

import schemas from './schema.json';
import sensor from './sensor';
// import all other routes here

const Router = express.Router();
const v = new Validator();

Router.use((req, res, next) => {
  const schema = schemas[req.originalUrl][req.method];
  v.addSchema(schema, schema.id);
  const isValid = req.body && v.validate(req.body, schema.id);

  if (isValid.errors.length === 0) return next();

  return next({ message: isValid.errors[0].message, statusCode: 400 });
});

Router.use('/sensor', sensor);

export default Router;
