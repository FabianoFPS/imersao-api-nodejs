class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

class ICrud {
  create(item) {
    throw new NotImplementedException();
  }
  read(id) {
    throw new NotImplementedException();
  }
  update(id, item) {
    throw new NotImplementedException();
  }
  delete(id) {
    throw new NotImplementedException();
  }
}

class MongoDB extends ICrud {
  constructor() {
    super();
  }
  create(item) { console.log('O item foi salvo em MongoDB') }
}

class Postgres extends ICrud {
  constructor() {
    super();
  }
  create(item) { console.log('O item foi salvo em Postgres') }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy
  }

  create(item) {
    return this._database.create(item);
  }
  read(id) {
    return this._database.read(id);
  }
  update(id, item) {
    return this._database.update(id, item);
  }
  delete(id) {
    return this._database.delete(id);
  }
}

const contextMongo = new ContextStrategy(new MongoDB);
contextMongo.create({});
const contextPostagres = new ContextStrategy(new Postgres);
contextPostagres.create({});

contextMongo.read();