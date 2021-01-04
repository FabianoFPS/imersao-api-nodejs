const baseRoute = require('./base/baseRoute');

class HeroisRoutes extends baseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (request, response) => {
        return this.db.read();
      }
    }
  }
}

module.exports = HeroisRoutes;