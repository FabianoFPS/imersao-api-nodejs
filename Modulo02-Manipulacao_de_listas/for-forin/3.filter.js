const { obterPessoas } = require('./services');

Array.prototype.meuFilter = function (calback) {
  const lista = [];
  for (indice in this) {
    const item = this[indice]
    const result = calback(item, indice, this)

    if (!result) continue;

    lista.push(item)
  }

  return lista;
}

async function main() {
  try {
    const { results } = await obterPessoas('a');

    // const familiaLars = results.filter(item => {
    //   const result = item.name.toLowerCase().indexOf('lars') !== -1;
    //   return result;
    // })
    
    const familiaLars = results.meuFilter(item => {
      const result = item.name.toLowerCase().indexOf('lars') !== -1;
      return result;
    })
    
    const names = familiaLars.map(pessoa => pessoa.name);
    console.log(names);
  } catch (error) {
    console.error('Deu Ruim', error)
  }
}

main()