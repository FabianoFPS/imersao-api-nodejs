const Sequelize = require('sequelize');

const HeroiSchema = {
  name: 'herois',
  schema: {
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
  options: {
    tableName: 'TB_HEROES',
    freezeTableName: false,
    timesstamps: false
  }
}

module.exports = HeroiSchema;