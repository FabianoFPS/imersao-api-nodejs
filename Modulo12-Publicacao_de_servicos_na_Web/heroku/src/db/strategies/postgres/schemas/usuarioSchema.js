const Sequelize = require('sequelize');

const UsuarioSchema = {
  name: 'usuarios',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      required: true,
    },
    password: {
      type: Sequelize.STRING,
      require: true
    }
  },
  options: {
    tableName: 'tb_usuarios',
    freezeTableName: false,
    timesstamps: false
  }
}

module.exports = UsuarioSchema;