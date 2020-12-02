const {obterPessoas} = require('./services');

Array.prototype.meuReduce = function (calback, valorIncial) {
  let valorFinal = valorIncial ?? null;
  // let valorFinal = typeof valorIncial === undefined ? valorIncial : this[0];
  for (let index = 0; index < this.length; index++) {
    valorFinal = calback(valorFinal, this[index], this)
  }
  return valorFinal;
}

async function main() {
  try {
    const { results } = await obterPessoas(`a`);
    const pesos = results.map(item => parseInt(item.height));
    // const total = pesos.reduce((anterior, proximo) => {
    //   return anterior + proximo
    // }, 0);
    // const total = pesos.meuReduce((anterior, proximo) => {
    //   return anterior + proximo
    // });
    const minhaLista = [
      ['Fabiano', 'Stoffel'],
      ['NodeBR', 'Nerdão']
    ]
    const total = minhaLista.meuReduce((anterior, proximo) => {
      return anterior.concat(proximo);
    }, []).join(', ');
    console.log(total);
  } catch (error) {
    console.log('Erro:', error.message);
  }
}

main()