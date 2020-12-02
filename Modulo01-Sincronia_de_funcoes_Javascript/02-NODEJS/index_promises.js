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

const usuarioPromise = obterUsuario()

// usuarioPromise
//   .then(function (resultado) {

//   }, function (erro) {

//   })

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
      .then(function resolveTelefone(result) {
        return {
          usuario: {
            nome: usuario.nome,
            id: usuario.id
          },
          telefone: result
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        ['endereço']: result
      }
    })
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome},
      Endereço: ${resultado['endereço'].rua}, ${resultado['endereço'].numero},
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch(function (error) {
    console.log('Excessão capturada no ".catch"', error);
  })