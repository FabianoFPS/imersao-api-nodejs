const ICrud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose');

const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
}

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();
    this.schema = schema;
    this.connection = connection;
  }
  async isConnected() {
    const state = STATUS[this.connection.readyState];
    if (state !== 'Conectando') return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this.connection.readyState];
  }
  
  static connect() {
    Mongoose.connect('mongodb://aplicacao:123456@localhost:27017/heroes', {
      useNewUrlParser: true, useUnifiedTopology: true
    }, function (error) {
      if (error) console.error('Falha na conexão', error.message);
      return;
    });

    const connection = Mongoose.connection;
    connection.once('open', () => console.log('database rodando'));
    return connection;
  }
  async create(item) {
    return await this.schema.create(item);
  }
  async read(item, skip = 0, limit = 10) {
    return await this.schema
      .find(item)
      .skip(skip)
      .limit(limit);
  }
  update(id, item) {
    return this.schema.updateOne({ _id: id }, { $set: item });
  }
  async delete(id) {
    return await this.schema.deleteOne({ _id: id });
  }
  async close() {
    await this.connection.close();
  }
}

module.exports = MongoDB;
