const ftfPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

module.exports = ftfPlugin(async (ftf, options) => {
  const func = async(entity, query) => {
    entity = entity.charAt(0).toUpperCase() + entity.slice(1).toLowerCase()
    if(entity == "State") {
      if(typeof query == 'string'){
        state = await ftf.model[entity].findOne({
          name: query
        })
        if(state){
          return state
        }
        else {
          state = await ftf.model[entity].findOne({
            _id: query.toObjectId()
          })
          if(state){
            return state
          }
          else {
            state = await ftf.service.State.create(query);
          }
        }
      }
      else if (query instanceof mongoose.Types.ObjectId) {
        state2 = await ftf.model[entity].findOne({
          _id: query
        })
        return state2
      }
    }

    else if(typeof query == 'string'){
      return await ftf.model[entity].findOne({
        _id: query.toObjectId()
      })
    }
  }
  ftf.service = Object.assign(ftf.service || {}, {getObject: func})
})
