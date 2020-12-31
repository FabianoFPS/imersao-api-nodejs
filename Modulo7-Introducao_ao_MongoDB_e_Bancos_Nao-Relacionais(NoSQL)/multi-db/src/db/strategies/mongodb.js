const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose');

const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
}

class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state !== 'Conectando') return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }
  defineModel() {
    const heroiSchema = new Mongoose.Schema({
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

    this._herois = Mongoose.model('herois', heroiSchema);
  }
  connect() {
    Mongoose.connect('mongodb://aplicacao:123456@localhost:27017/heroes', {
      useNewUrlParser: true, useUnifiedTopology: true
    }, function (error) {
      if (error) console.error('Falha na conexão', error.message);
      return;
    });

    this._driver = Mongoose.connection;
    this._driver.once('open', () => console.log('database rodando'));
    this.defineModel();
  }
  async create(item) {
    return await this._herois.create(item);
  }
  async read(item, skip = 0, limit = 10) {
    return await this._herois
      .find(item)
      .skip(skip)
      .limit(limit);
  }
  update(id, item) {
    return this._herois.updateOne({ _id: id }, { $set: item });
  }
  async delete(id) {
    return await this._herois.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
