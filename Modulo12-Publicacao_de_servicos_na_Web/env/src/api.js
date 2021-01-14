'use strict'
const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');
const env = process.env.NODE_ENV || 'dev';
ok(env === 'prod' || env === 'dev', 'a env é inválida, ou é dev ou é prod');
const configPath = join(__dirname, '../config', `.env.${env}`);
console.log(configPath);
config({
  path: configPath,
});

const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const HapiJwt = require('hapi-auth-jwt2');

const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema')
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HerosRoute = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const JWT_SECRET = process.env.JWT_kEY;

const app = Hapi.Server({ port: process.env.PORT });

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

module.exports = (async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroisSchema));

  const connectionPostgres = await Postgres.connect();
  const usuarioSchema = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
  const contextPostgres = new Context(new Postgres(connectionPostgres, usuarioSchema));

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
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: async (dado, request) => {
      const [result] = await contextPostgres.read({
        username: dado.username.toLowerCase(),
        id: dado.id,
      })

      if (!result) return { isValid: false };

      // verifica ...
      return {
        isValid: true // ou false
      }
    }
  })

  app.auth.default('jwt');

  const heroMethods = mapRoutes(new HerosRoute(context), HerosRoute.methods());
  const authMethods = mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods());

  app.route([...heroMethods, ...authMethods]);

  await app.start();
  console.info(`Servidor rodando na porta ${app.info.port}`);
  return app;
})()