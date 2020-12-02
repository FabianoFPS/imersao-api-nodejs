const axios = require('axios');
const URL = 'https://swapi.dev/api/people';

async function obterPessoas(nome) {
  // console.log(nome);
  const url = `${URL}/?search=${nome}&format=json`
  // co?nst url = `https://swapi.dev/api/people/?search=r2`
  const response = await axios.get(url)
  return response.data
}

// obterPessoas('r2')
//   .then(response => console.info(response))
//   .catch(error => console.error('Deuruin', error))

module.exports = {
  obterPessoas
}