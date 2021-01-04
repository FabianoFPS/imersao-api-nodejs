const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('heroes', 'admin', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  // quoteIdentifiers: false,
  operatorsAliases: false
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const heroes = sequelize.define('herois', 
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

  await heroes.sync();

  // const result = await heroes.create({
  //   nome: 'Lanterna Verde',
  //   poder: 'Anel',
  // });
  console.log(
    'result',
    await heroes.findAll({ raw: true, attributes: ['nome', 'poder', 'id'] }),
  );
  sequelize.close()
}
main();
