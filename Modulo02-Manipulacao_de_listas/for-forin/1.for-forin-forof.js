const service = require('./services');

async function main() {
  try {
    const result = await service.obterPessoas('a')
    const names = []

    console.time('for  ')
    for (let index = 0; index < result.results.length; index++) {
      const pessoa = result.results[index];
      names.push(pessoa.name)
    }
    console.timeEnd('for  ')

    console.time('Forin')
    for(let i in result.results) {
      const pessoa = result.results[i]
      names.push(pessoa.name)
    }
    console.timeEnd('Forin')

    console.time('Forof')
    for(pessoa of result.results) {
      names.push(pessoa.name)
    }
    console.timeEnd('Forof')

    console.log('names', names);
  } catch (error) {
    console.error('Erro interno:', error)
  }
}

main()