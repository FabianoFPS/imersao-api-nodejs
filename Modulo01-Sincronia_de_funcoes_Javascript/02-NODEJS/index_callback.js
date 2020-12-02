/**
 * 0 Obter um usuario
 * 1 Obter o numero de telefone de um usuário a partir de seu Id
 * 2 Obter o endereço do usuário pelo Id
 */

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(()=> {
    return callback(null, {
      telefone: '985867847',
      ddd: 51
    })
  }, 2000)
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos Bobos',
      numero: 0
    })
  }, 2000)
}

function resolverUsuario(erro, Usuario) {
  console.log('Usuário', usuario);

}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error('Deu ruim em usuário', error)
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
    if (erro1) {
      console.erro('Deu ruim em telefone', error1)
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
      if (erro2) {
        console.erro('Deu ruim em telefone', error2)
        return;
      }
      
      console.log(`
        Nome: ${usuario.nome},
        Endereço: ${endereco.rua}, ${endereco.numero},
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `)
    })
  })
})
