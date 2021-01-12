'use strict'
const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');

const app = Hapi.Server({ port: 5000 });

(async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroisSchema));

  app.route([
    {
      path: '/herois',
      method: 'GET',
      handler: (request, response) => {
        return context.read();
      }
    }
  ])

  await app.start();
  console.info(`Servidor rodando na porta ${app.info.port}`);
})()