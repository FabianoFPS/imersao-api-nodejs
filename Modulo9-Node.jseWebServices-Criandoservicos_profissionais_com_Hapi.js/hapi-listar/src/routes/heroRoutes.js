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
        try {
          const { skip, limit, nome } = request.query;
          
          const query = nome ? { nome } : {};
          const skipInt = !isNaN(skip) ? parseInt(skip) : 0;
          const limitInt = !isNaN(limit) ? parseInt(limit) : 10;

          return this.db.read(query, skipInt, limitInt);
        } catch (error) {
          console.error(`Erro GET: ${error.message}`);
          return 'Erro interno no servidor';
        }
      }
    }
  }
}

module.exports = HeroisRoutes;