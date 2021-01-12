const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');

const failAction = (request, header, erro) => {
  throw erro;
}

const USER = {
  username: 'rainha',
  password: '123'
}

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Obter token',
        notes: 'faz login com user e senha do banco',
        validate: {
          failAction,
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
          })
        }
      },
      handler: async (request) => {
        const { username, password } = request.payload;
        if (username.toLowerCase() !== USER.username || password !== USER.password)
          return Boom.unauthorized();

        const token = JWT.sign({
          username,
          id: 1,
        }, this.secret);

        return {
          token
        }
      }
    }
  }
}

module.exports = AuthRoutes;
