const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf,options) => {
  const func = async(title, state) => {
    const stateObj = await ftf.service.getObject('State', state)
    const todo = ftf.model.Todo()
    todo.name = title
    todo.state = stateObj
    try{
      await todo.save()
    }
    catch(err) {
      return false
    }

    return todo
  }
  ftf.service.Todo = Object.assign(ftf.service.Todo || {}, {create: func})
})
