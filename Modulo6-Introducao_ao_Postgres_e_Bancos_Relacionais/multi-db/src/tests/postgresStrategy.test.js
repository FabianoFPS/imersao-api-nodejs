const { deepStrictEqual } = require('mocha');
const assert = require ('assert')
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres);
const MOCK_HEROI_CADASTRAR = {
  nome: 'Gavião Negro',
  poder: 'flexas'
}
const MOCK_HEROI_ATUALIZAR = {
  nome: 'Batman',
  poder: 'Dinheiro'
}
function removeAtributos(item) {
  delete item.id;
  delete item.createdAt;
  delete item.updatedAt;
  return item;
}
describe('Postgres Strategy', function () {
  this.timeout(Infinity);
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEROI_ATUALIZAR)
  })
  it('PostgresSQL Connection', async function () {
    const expectd = true;
    const result = await context.isConnected();
    assert.deepStrictEqual(result, expectd);
  })
  it('cadastrar', async () => {
    const result0 = await context.create(MOCK_HEROI_CADASTRAR);
    const result = removeAtributos(result0);
    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
  })
  it('listar', async () => {
    const [result0] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    const result = removeAtributos(result0);
    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
  })
  it('atualizar', async () => {
    const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
    const { id } = itemAtualizar;
    const novoItem = {
      ...removeAtributos(itemAtualizar),
      nome: 'Mulher Maravilha'
    }
    const [result] = await context.update(id, novoItem);
    const [itemAtualizado] = await context.read({ id });
    assert.deepStrictEqual(result, 1);
    assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome);
  })
  it('remover por id', async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepStrictEqual(result, 1);
  })
});
