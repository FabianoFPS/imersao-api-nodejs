const { deepStrictEqual } = require('mocha');
const assert = require ('assert')

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'flash',
  poder: 'speed',
  id: 1,
}

describe('Suite de manipulação de Herois', () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
  })
  it('deve pesquisarum heroi usando arquivos', async () => {
    const expectd = DEFAULT_ITEM_CADASTRAR
    const [resultado] = await database.listar(expectd.id)
    assert.deepStrictEqual(resultado, expectd)
  })
  it('deve cadastrar um heroi, usando arquivos', async () => {
    const expectd = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [actual] =  await database.listar(DEFAULT_ITEM_CADASTRAR.id);
                      
    assert.deepStrictEqual(actual, expectd);
  })
  // it.only('deve remover um heroi por id', async () => {
  it('deve remover um heroi por id', async () => {
    const expectd = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    assert.deepStrictEqual(resultado, expectd);
  })
})
