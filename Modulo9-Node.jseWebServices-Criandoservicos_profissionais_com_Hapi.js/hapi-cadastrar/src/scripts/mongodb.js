//docker ps

const { DatabaseError } = require("sequelize/types")

// docker exec -it 62e4ed80cb69 mongo -u aplicacao -p 123456 --authenticationDatabase heroes
//databases
show dbs

// mudando o contexto para uma database
use heroes

// mostrar tables -> (coleções)
show collections

db.herois.insert({
  nome: 'Flash',
  pode: 'Velocidade',
  dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i = 0; i<= 100; i ++) {
  db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1888-02-02'
  })
}

db.herois.count()
db.herois.findOne();

db.herois.find().limit(10).sort({ nome: -1 })
db.herois.find({}, {pode: 1, _id: 0})

db.herois.find({nome: 'Flash'})

//perde dados, substitui
db.herois.update({_id: ObjectId("5fecc8325107469fde5cd1d5")}, {nome: 'Mulher maravilha'})

// mantem os outros dados
db.herois.update({_id: ObjectId("5fecc9865107469fde5cd236")}, { $set: {nome: 'Lanterna Verde'}})
db.herois.find({ _id: ObjectId("5fecc9865107469fde5cd236") })

db.herois.update({poder: 'Velocidade'},{$set: {poder: 'Super Força'}})

db.herois.remove({}) // todos
db.herois.remove({nome: 'Mulher maravilha'})