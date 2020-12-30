//npm i sequelize pg-hstore pg
const Sequelize = require('sequelize');
const driver = new Sequelize(
  'heroes',
  'admin',
  '123456',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorsAliases: false
  }
)

async function main() {
  const Heroes = driver.define(
    'herois', 
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
  console.log('VIVO');
  
  try {
    await Heroes.sync();
    
    // const result = await Heroes.findAll({
    //   raw: true, attributes: ['nome', 'poder', 'id']
    // })
    
  } catch (error) {
    console.error(error)    
  }

  
  console.log('result', result);
}

main();