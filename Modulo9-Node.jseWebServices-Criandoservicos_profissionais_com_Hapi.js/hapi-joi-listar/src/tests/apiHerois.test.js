const assert = require('assert');
const api = require('../api');
let app = {};

describe('Suite de teste da API Herois', function() {
  this.beforeAll(async () => {
    app = await api;
  })
  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois',
    })
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepStrictEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  })
  it('listar /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO = 'ABC';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO}`
    });
    const errorResult = {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "child \"limit\" fails because [\"limit\" must be a number]",
      "validation": {
        "source": "query",
        "keys": [
          "limit"
        ]
      }
    };

    assert.deepStrictEqual(result.statusCode, 400);
    assert.deepStrictEqual(result.payload, JSON.stringify(errorResult));

  })
  it('listar /herois - deve retornar somente 10 registros', async () => {
    const TAMANHO_LIMIT = 3;
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`,
    })
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepStrictEqual(statusCode, 200);
    assert.deepStrictEqual(dados.length, TAMANHO_LIMIT);
  })
  it('listar /herois - deve retornar somente 10 registros', async () => {
    const TAMANHO_LIMIT = 100;
    const NAME = 'Homem Aranha 1609595834895';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NAME}`,
    })
    const [heroi] = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepStrictEqual(statusCode, 200);
    assert.deepStrictEqual(heroi.nome, NAME);
  })
});