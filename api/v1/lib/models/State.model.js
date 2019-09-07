const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf, options) => {
  const Schema = ftf.mongoose.Schema
  const Model = ftf.mongoose.model('State', Schema({
    name: {type: String},
  }))
  ftf.model = Object.assign(ftf.model || {}, {State: Model})
})
