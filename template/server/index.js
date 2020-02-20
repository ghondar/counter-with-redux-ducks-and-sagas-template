import AutoLoad from 'fastify-autoload'
import path from 'path'

module.exports = function(fastify, opts, next) {
  fastify.register(AutoLoad, {
    dir    : path.join(__dirname, 'v1'),
    options: {
      prefix: '/v1'
    }
  })

  next()
}