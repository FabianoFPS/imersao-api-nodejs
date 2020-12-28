const { deepStrictEqual } = require('mocha');
const assert = require ('assert')

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'flash',
  poder: 'speed',
  id: 1,
}
const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna Verde',
  poder: 'Energia do Anel',
  id: 2
}
describe('Suite de manipulação de Herois', () => {
  before(async () => {
    try{
      await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    }catch(e) {}
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    try {
      await database.remover(DEFAULT_ITEM_ATUALIZAR.id);
    } catch (error) {}
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
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
  it('deve atualizar um heroi pelo id', async () => {
    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const expectd = {
      ...DEFAULT_ITEM_ATUALIZAR,
      ...novoDado
    }
    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
    assert.deepStrictEqual(resultado, expectd);
  });
})
