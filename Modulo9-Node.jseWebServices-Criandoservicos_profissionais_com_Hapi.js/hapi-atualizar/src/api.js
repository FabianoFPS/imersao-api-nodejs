'use strict'
const Hapi          = require('hapi');

const Context       = require('./db/strategies/base/contextStrategy');
const MongoDB       = require('./db/strategies/mongodb/mongodb');
const HeroisSchema  = require('./db/strategies/mongodb/schemas/heroisSchema');
const HerosRoute    = require('./routes/heroRoutes');

const app = Hapi.Server({ port: 5000 });

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

module.exports = (async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroisSchema));

  app.route([
    ...mapRoutes(new HerosRoute(context), HerosRoute.methods())
  ])

  await app.start();
  console.info(`Servidor rodando na porta ${app.info.port}`);
  return app;
})()