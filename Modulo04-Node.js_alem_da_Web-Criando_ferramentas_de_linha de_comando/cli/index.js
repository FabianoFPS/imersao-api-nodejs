const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./Heroi.class');

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', `Nome do Heroi`)
    .option('-p, --poder [value]', 'Poder do Heroi')
    .option('-i, --id [value]', 'Id do Heroi')
    .option('-c,  --cadastrar', 'Cadastrar um heroi')
    .option('-l,  --listar', 'Listar um heroi')
    .option('-r,  --remover', 'Remove um heroi pelo id')
    .option('-a,  --atualizar [value]', 'Atualiza um heroi pelo id')
    .parse(process.argv);

  const heroi = new Heroi(Commander);
  try {
    if (Commander.cadastrar) {
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) return console.error('Heroi não cadastrado!');
      console.log('Heroi Cadastrado com sucesso!');
    }

    if (Commander.listar) {
      const resultado = await Database.listar();
      console.log(resultado)
      return;
    }

    if (Commander.remover && heroi.id) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) return console.error('Não foi possivel remover o heroi');
      console.log('Heroi removido com sucesso!');
    }
    
    if (Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);
      
      // remove undefined e null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      
      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
      if (!resultado) return console.error('Não foi possivel atualizar o heroi');
      console.log('Heroi atualizado com sucesso!');
    }
  } catch (error) {
    console.error('ERRO: ', error.message)
  }
}
main();
