const ContextStrategy = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb');
const Postgres = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDB);
contextMongo.create({});
const contextPostagres = new ContextStrategy(new Postgres);
contextPostagres.create({});