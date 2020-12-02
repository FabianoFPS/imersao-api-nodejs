const service = require('./services');

Array.prototype.meuMap = function (calback) {
  const novoArrayMapeado = []
  for (let index = 0; index < this.length; index++) {
    const resultado = calback(this[index], index);
    novoArrayMapeado.push(resultado)
  }
  return novoArrayMapeado;
}

async function main() {
  try {
    const result = await service.obterPessoas('a')
    let names = []
    
    console.time('ForEach')
    result.results.forEach(item => names.push(item.name))
    console.timeEnd('ForEach')

    console.time('Map')
    names = result.results.map(pessoa => pessoa.name);
    console.timeEnd('Map')
    
    console.time('MeuMap')
    names = result.results.meuMap(function(pessoa, indice) {
      return `[${indice}]${pessoa.name}`
    })
    console.timeEnd('MeuMap')

    console.log('names', names);
  } catch (error) {
    console.error('Deu Reuin', error)
  }
}

main()