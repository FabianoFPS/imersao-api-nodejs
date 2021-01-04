const baseRoute = require('./base/baseRoute');
const Joi = require('joi');

class HeroisRoutes extends baseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  list() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        validate: {
          failAction: (request, header, erro) => {
            throw erro;
          },
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100),
          }
        }
      },
      handler: (request, response) => {
        try {
          const { skip, limit, nome } = request.query;
          
          const query = nome ? { nome: {$regex: `.*${nome}*.`} } : {};

          return this.db.read(query, skip, limit);
        } catch (error) {
          console.error(`Erro GET: ${error.message}`);
          return 'Erro interno no servidor';
        }
      }
    }
  }
}

module.exports = HeroisRoutes;