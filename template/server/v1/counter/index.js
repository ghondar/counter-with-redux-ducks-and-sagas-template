module.exports = function(fastify, opts, next) {
  fastify.get('/', (req, res) => {
    res.send({
      count: 5
    })
  })

  next()
}

module.exports.autoPrefix = '/counter'
