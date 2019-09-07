const ftfPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

module.exports = ftfPlugin(async (ftf, options) => {
  const func = async(entity, query) => {
    entity = entity.charAt(0).toUpperCase() + entity.slice(1).toLowerCase()

    if(entity == "State") {
      state = await ftf.model[entity].findOne({
        name: query
      })
      if(!state){
      state = await ftf.service.State.create(query);
      }
      return state
    }
  }
})
