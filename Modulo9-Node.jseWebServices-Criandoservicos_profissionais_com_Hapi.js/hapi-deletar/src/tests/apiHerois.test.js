const assert = require('assert');
const api = require('../api');

let app = {};
const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Bionica',
}

const MOCK_HEROI_INICIAL = {
  nome: 'Gavião Arqueiro',
  poder: 'Mira',
}

let MOCK_ID = '';

describe('Suite de teste da API Herois', function () {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: MOCK_HEROI_INICIAL,
    })

    const dados = JSON.parse(result.payload);
    MOCK_ID = dados._id;
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
  it('cadastrar POST - /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      payload: MOCK_HEROI_CADASTRAR,
    });
    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.deepStrictEqual(message, 'Heroi cadastrado com sucesso');
    assert.notStrictEqual(_id, undefined)
  })
  it('atualizar PATCH - /herois/:id', async () => {
    const poder = 'Super mira';
    const expectedMessage = 'Heroi atualizado com sucesso!';
    const expected = {
      ...MOCK_HEROI_INICIAL,
      poder,
    }
    const { statusCode, payload } = await app.inject({
      method: 'PATCH',
      url: `/herois/${MOCK_ID}`,
      payload: { poder }
    });
    const { message } = JSON.parse(payload);

    assert.deepStrictEqual(statusCode, 200);
    assert.ok(statusCode === 200);
    assert.deepStrictEqual(message, expectedMessage);
  })
  it('atualizar PATCH - /herois/:id | não deve atualizar com ID incorreto', async () => {
    const poder = 'Super mira';
    const expectedMessage = 'Id não encontrado no banco!';
    const expected = {
      ...MOCK_HEROI_INICIAL,
      poder,
    }
    const { statusCode, payload } = await app.inject({
      method: 'PATCH',
      url: `/herois/000004f2e3a36168b85fffff`,
      payload: { poder }
    });
    const { message } = JSON.parse(payload);
    assert.deepStrictEqual(statusCode, 412);
    assert.deepStrictEqual(message, expectedMessage);
  })
  it('remover DELETE - /herois/:id ', async () => {
    const expectedMessage = 'Heroi removido com sucesso!';
    const { statusCode, payload } = await app.inject({
      method: 'DELETE',
      url: `/herois/${MOCK_ID}`,
    });
    const { message } = JSON.parse(payload);

    assert.deepStrictEqual(statusCode, 200);
    assert.ok(statusCode === 200);
    assert.deepStrictEqual(message, expectedMessage);
  })
  it('remover DELETE - /herois/:id | Não deve remover', async () => {
    const expectedMessage = 'Id não encontrado no banco!';
    const { statusCode, payload } = await app.inject({
      method: 'DELETE',
      url: `/herois/000004f2e3a36168b85fffff`,
    });
    const { message } = JSON.parse(payload);

    assert.deepStrictEqual(statusCode, 412);
    assert.deepStrictEqual(message, expectedMessage);
  })
  it('remover DELETE - /herois/:id | Não deve remover com ID inválido', async () => {
    const expectedMessage = 'An internal server error occurred';
    const { statusCode, payload } = await app.inject({
      method: 'DELETE',
      url: `/herois/zzzyyy`,
    });
    const { message } = JSON.parse(payload);

    assert.deepStrictEqual(statusCode, 500);
    assert.deepStrictEqual(message, expectedMessage);
  })
});