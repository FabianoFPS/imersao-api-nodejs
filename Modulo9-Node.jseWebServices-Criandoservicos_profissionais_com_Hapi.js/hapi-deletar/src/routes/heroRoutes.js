const baseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('@hapi/boom');

const failAction = (request, header, erro) => {
  throw erro;
}

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
          failAction,
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
          return Boom.internal();
        }
      }
    }
  }
  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(2).max(100),
          }
        }
      },
      handler: async (request, response) => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            message: 'Heroi cadastrado com sucesso',
            _id: result._id,
            heroi: result,
          }
        } catch (error) {
          console.error(`Erro Creat: ${error.message}`)
          return Boom.internal();
        }
      }
    }
  }
  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
          payload: {
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(2).max(100),
          }
        }
      },
      handler: async (request, response) => {
        try {
          const { id } = request.params;
          
          const dados = request.payload;
          Object
            .keys(dados)
            .forEach(key => dados[key] === undefined && delete dados[key]);

          const result = await this.db.update(id, dados);
          if (!result.nModified) return Boom.preconditionFailed('Id não encontrado no banco!');
          return {
            message: 'Heroi atualizado com sucesso!',
            _id: result._id,
          }
        } catch (error) {
          console.error(`Erro Update: ${error.message}`)
          return Boom.internal();
        }
      }
    }
  }
  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
        }
      },
      handler: async (request, response) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          if (!result.deletedCount) return Boom.preconditionFailed('Id não encontrado no banco!');
          return {
            message: 'Heroi removido com sucesso!',
          }
        } catch (error) {
          console.error(`Erro Delete: ${error.message}`)
          return Boom.internal();
        }
      }
    }
  }
  
}

module.exports = HeroisRoutes;