const { deepStrictEqual } = require('mocha');
const assert = require('assert')
const Mongodb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Mongodb);
const MOCK_HEROI_CADASTRAR = {
  nome: 'Mulher Maravilha',
  poder: 'Laço',
}
const MOCK_HEROI_DEFAULT = {
  nome: `Homem Aranha ${Date.now()}`,
  poder: 'Super teia',
}
const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino ${Date.now()}`,
  poder: 'Velocidade',
}

let MOCK_HEROI_ID;

describe('MongoDB Suite de testes', function () {
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEROI_DEFAULT);
    MOCK_HEROI_ID = await context.create(MOCK_HEROI_ATUALIZAR);
  })
  it('verificar conexão', async () => {
    const expected = 'Conectado';
    const result = await context.isConnected();
    assert.deepStrictEqual(result, expected);
  })
  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  })
  it('listar', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome });
    const result = { nome, poder };
    assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT);
  })
  it('atualizar', async () => {
    const nome = 'Pernalonga';
    const result = await context.update(MOCK_HEROI_ID.id, { nome });
    assert.deepStrictEqual(result.nModified, 1);
  })
  it('remover', async () => {
    const result = await context.delete(MOCK_HEROI_ID._id)
    assert.deepStrictEqual(result.n, 1);
  })
})
