'use strict'
const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HerosRoute = require('./routes/heroRoutes');

const app = Hapi.Server({ port: 5000 });

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

module.exports = (async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroisSchema));
  
  const swaggerOptions = {
    info: {
      title: 'API Herois - #CursoNodeBr',
      version: 'v1.0'
    },
    lang: 'pt',
    documentationPage: true,
    swaggerUI: true
  }
  await app.register([
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

const result = mapRoutes(new HerosRoute(context), HerosRoute.methods());
  app.route(result);

  await app.start();
  console.info(`Servidor rodando na porta ${app.info.port}`);
  return app;
})()