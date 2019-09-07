const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf, options) => {
  const Schema = ftf.mongoose.Schema

  const Model = ftf.mongoose.model('Todo', Schema({
    title: {type: String},
    state: {type: Schema.Types.ObjectId, ref: 'State'}
  }))
  ftf.model = Object.assign(ftf.model || {}, {Todo: Model})
})
