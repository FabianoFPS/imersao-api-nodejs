const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');

const PasswordHelper = require('../helper/passworHelper');

const failAction = (request, header, erro) => {
  throw erro;
}

const USER = {
  username: 'rainha',
  password: '123'
}

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
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
        // if (username.toLowerCase() !== USER.username || password !== USER.password)
        //   return Boom.unauthorized();
        const [usuario] = await this.db.read({
          username: username.toLowerCase()
        })
        if (!usuario) return Boom.unauthorized('Usuário ou senha inválidos');
        
        const match = await PasswordHelper.comparePassword(password, usuario.password);

        if(!match) return Boom.unauthorized('Usuário ou senha inválidos');
        const token = JWT.sign({
          username,
          id: usuario.id,
        }, this.secret);

        return {
          token
        }
      }
    }
  }
}

module.exports = AuthRoutes;
