const Mongoose = require('mongoose');
Mongoose.connect('mongodb://aplicacao:123456@localhost:27017/heroes', {
  useNewUrlParser: true, useUnifiedTopology: true
}, function (error) {
  if (error) console.error('Falha na conexão', error.message);
  return;
});

const connection = Mongoose.connection;
connection.once('open', () => console.log('database rodando'));
// setTimeout(() => console.log(connection.readyState), 1000);

/*
connection.readyState
0: disconectado;
1: conectado;
2: conectando;
3: disconectando
*/

const heroiSchema = new Mongoose.Schema ({
  nome: {
    type: String,
    required: true,
  },
  poder: {
    type: String,
    required: true,
  },
  insertAt: {
    type: Date,
    default: new Date(),
  }
});

const model = Mongoose.model('herois', heroiSchema);

async function main() {
  const resultadoCadastrar = await model.create({
    nome: 'Batman',
    poder: 'Dinheiro',
  });
  resultadoCadastrar._doc;

  const listItens = await model.find();
  console.log(listItens);
}

main();