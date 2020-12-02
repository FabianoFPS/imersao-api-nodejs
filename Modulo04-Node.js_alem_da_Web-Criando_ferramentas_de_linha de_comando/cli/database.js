const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// outra forma de obter os dados do json
// const dadosJson = require('./heroes.json')

class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json';
  }
  
  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
    return true
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();
    const dadosFiltrados = dados.filter(item => {
      return id ? id === item.id : true;
    })
    return dadosFiltrados;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo()
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroiComId = {
      id,
      ...heroi
    }
    const dadosFinal = [
      ...dados,
      heroiComId
    ]
    const resultado = await this.escreverArquivo(dadosFinal)
    return resultado;
  }

  async remover(id) {
    if(!id) return await this.escreverArquivo([]);

    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex(item => item.id === parseInt(id))

    if (!~indice) throw Error('O heroi não existe');

    dados.splice(indice, 1);
    return await this.escreverArquivo(dados);
  }
}

module.exports = new Database()