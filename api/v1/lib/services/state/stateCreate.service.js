const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf,options) => {
  const func = async(name) => {
    const states = ftf.model.State()
    states.name = name
    try{
      await states.save()
    }
    catch(err) {
      return false
    }
  }
  ftf.service.State = Object.assign(ftf.service.State || {}, {create: func})
})
