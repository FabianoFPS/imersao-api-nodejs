const { get }= require('axios');

const URL = 'https://swapi.dev/api/people';
const funcao = 'search';
const formato = 'format=json';

async function obterPessoas(nome) {
  const url = `${URL}/?${funcao}=${nome}&${formato}`;
  const result = await get(url);
  // console.log(JSON.stringify(result.data));
  return result.data.results.map(mapearPessoa);
}

function mapearPessoa(item) {
  return {
    nome: item.name,
    peso: item.height,
  }
}

module.exports = { obterPessoas };