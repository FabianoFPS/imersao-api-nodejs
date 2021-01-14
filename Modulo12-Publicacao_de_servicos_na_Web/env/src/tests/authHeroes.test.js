const { deepStrictEqual } = require('mocha');
const assert = require('assert')

const api = require('../api');
const Context = require('../db/strategies/base/contextStrategy');
const Postgres = require('../db/strategies/postgres/postgres');
const UsuarioSchema = require('../db/strategies/postgres/schemas/usuarioSchema')

let app = {};
const USER = {
  username: 'rainha',
  password: '123',
}
const USER_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$O29fxS/WLhKh5iGGF.f1Ye0hsFOnt9KZOOAWPA9HHaP2P/uMMiUDC'
}

describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api;
    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
    const postgres = new Context(new Postgres(connectionPostgres, model));
    const result = await postgres.update(null, USER_DB, true);
  });
  it('deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER,
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepStrictEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
  it('deve retornar não autorizado ao tentar obter um login errado', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'usuarioInesistente',
        password: 'senhaInesistente'
      }
    })
    const { statusCode } = result;
    const dados = JSON.parse(result.payload);

    assert.deepStrictEqual(statusCode, 401);
    assert.deepStrictEqual(dados.error, 'Unauthorized');
  })
});