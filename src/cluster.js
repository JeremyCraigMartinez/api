/* eslint no-console:0 */

import 'babel-polyfill';

import cluster from 'cluster';
import os from 'os'; // eslint-disable-line no-unused-vars

import app from './app';

const numCPUs = 2; // os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(8000);

  console.log(`Worker ${process.pid} started`);
}
