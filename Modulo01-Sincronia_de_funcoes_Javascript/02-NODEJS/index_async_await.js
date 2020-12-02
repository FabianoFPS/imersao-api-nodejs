/**
 * 0 Obter um usuario
 * 1 Obter o numero de telefone de um usuário a partir de seu Id
 * 2 Obter o endereço do usuário pelo Id
 */
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('Deu ruin de verdade'))
      
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(()=> {
      return resolve({
        telefone: '985867847',
        ddd: 51
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos Bobos',
      numero: 0
    })
  }, 2000)
}

// ao adicionar async automaticamnte a funçao retorna uma promise
async function main() {
  try {
    // console.time('medida-promise')
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const [telefone, endereco] = resultado;
    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `);
    // console.timeEnd('medida-promise')
    return {telefone, endereco}
  } catch (error) {
    console.error('Execessão capturada main.catch', error)
  }
}

main().then((result) => {
  console.log(result);
}, () => {
  console.error('Excessão capturada na then', error)
})

/* OU */

const promise = main();
promise
  .then((result) => {
    console.log(result);
  }, () => {
    console.error('Excessão capturada na then', error)
  })
