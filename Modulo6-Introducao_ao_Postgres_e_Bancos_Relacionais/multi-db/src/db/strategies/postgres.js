const ICrud = require('./interfaces/interfaceCrud')
const { Sequelize } = require('sequelize');


class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
    // this._conected();
  }
  async isConnected() {
    try {
      await this._driver.authenticate();
      console.log('Connection has been established successfully.');
      return true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return false;
    }
  }
  async connect() {
    this._driver = new Sequelize('heroes', 'admin', '123456', {
      host: 'localhost',
      dialect: 'postgres',
      // quoteIdentifiers: false,
      // operatorsAliases: false
    });
    await this.defineModel();
  }
  async defineModel() {
    this._herois = this._driver.define('herois', 
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          require: true
        }
      },
      {
        tableName: 'TB_HEROES',
        freezeTableName: false,
        timesstamps: false
      } 
    );
    await this._herois.sync();
  }
  async create(item) {
    const {dataValues} = await this._herois.create(item);
    return dataValues;
  }
  async read(item = {}) {
    // return await this._herois.findAll({ where: item, raw: true, attributes: ['nome', 'poder'] })
    return await this._herois.findAll({ where: item, raw: true })
  }
  async update(id, item) {
    return await this._herois.update(item, {where: {id: id}});
  }
  async delete(id = {}) {
    const query = id ? { id } : {};
    return this._herois.destroy({ where: query });
  }
}

module.exports = Postgres;