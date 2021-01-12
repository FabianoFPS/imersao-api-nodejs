const { pickBy, identity } = require('lodash')

const originalObject = {
  valor1: 'A',
  valor2: 1,
  valor3: undefined,
}

let cleanedObject = {};

console.time('JSON')
cleanedObject = JSON.parse(JSON.stringify(originalObject))
console.timeEnd('JSON')
console.log(cleanedObject)

console.time('pickBY')
cleanedObject = pickBy(originalObject, identity)
console.timeEnd('pickBY')
console.log(cleanedObject)


// console.time('Object.key.filter')
// const keysValidas = Object
// .keys(originalObject)
// .filter(key => originalObject[key] !== undefined);
// cleanedObject = 
// console.timeEnd('Object.key.filter')
// console.log(cleanedObject)

console.time('FILTER')
cleanedObject = Object.entries(originalObject).filter(elemento => elemento[1]).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: value
  }
}, {})
console.timeEnd('FILTER')
console.log(cleanedObject)


console.time('Object.key.foreach')
Object
  .keys(originalObject)
  .forEach(key => originalObject[key] === undefined && delete originalObject[key]);
console.timeEnd('Object.key.foreach')
console.log(originalObject)